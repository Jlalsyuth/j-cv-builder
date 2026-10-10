-- ============================================================================
-- SKEMA DATABASE J CV BUILDER (SUPABASE / POSTGRESQL)
-- Cara menjalankan: Buka Supabase Dashboard → SQL Editor → Paste & Run
-- ============================================================================

-- CATATAN PENTING:
-- Tabel auth.users sudah otomatis ada di Supabase (tidak perlu dibuat manual).
-- Script ini hanya membuat tabel tambahan di schema "public".

-- ============================================================================
-- LANGKAH 0: Aktifkan ekstensi UUID
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- LANGKAH 1: Tabel profiles (menyimpan nama lengkap user)
-- Dibuat otomatis saat user mendaftar via trigger
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Trigger: otomatis buat profil saat user baru mendaftar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.email
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- LANGKAH 2: Tabel resumes (menyimpan data CV pengguna)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Resume ATS Baru',
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index untuk mempercepat query per user
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_updated_at ON public.resumes(updated_at DESC);

-- ============================================================================
-- LANGKAH 3: Aktifkan Row Level Security (RLS) pada tabel resumes
-- ============================================================================
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Hanya pemilik resume yang dapat melihat (SELECT)
CREATE POLICY "Users can select own resumes"
    ON public.resumes FOR SELECT
    USING (auth.uid() = user_id);

-- Hanya pengguna yang terotentikasi yang dapat membuat (INSERT)
CREATE POLICY "Users can insert own resumes"
    ON public.resumes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Hanya pemilik yang dapat memperbarui (UPDATE)
CREATE POLICY "Users can update own resumes"
    ON public.resumes FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Hanya pemilik yang dapat menghapus (DELETE)
CREATE POLICY "Users can delete own resumes"
    ON public.resumes FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- LANGKAH 4: Trigger updated_at otomatis untuk tabel resumes
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_resumes_updated_at ON public.resumes;
CREATE TRIGGER trigger_resumes_updated_at
    BEFORE UPDATE ON public.resumes
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- SELESAI! Sekarang pergi ke:
-- Authentication → Settings → Email → Matikan "Enable email confirmations"
-- agar user bisa langsung login setelah mendaftar tanpa konfirmasi email.
-- ============================================================================
