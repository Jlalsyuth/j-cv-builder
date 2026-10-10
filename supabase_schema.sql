-- ============================================================================
-- SKEMA DATABASE J CV BUILDER (SUPABASE / POSTGRESQL)
-- ============================================================================

-- 1. Pastikan ekstensi UUID tersedia
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Buat tabel resumes
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Resume ATS Saya',
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index untuk mempercepat query per user
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_updated_at ON public.resumes(updated_at DESC);

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- 4. Kebijakan Keamanan (RLS Policies):
-- Hanya pemilik resume yang dapat melihat (SELECT)
CREATE POLICY "Users can select own resumes"
    ON public.resumes
    FOR SELECT
    USING (auth.uid() = user_id);

-- Hanya pengguna yang terotentikasi yang dapat membuat (INSERT)
CREATE POLICY "Users can insert own resumes"
    ON public.resumes
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Hanya pemilik yang dapat memperbarui (UPDATE)
CREATE POLICY "Users can update own resumes"
    ON public.resumes
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Hanya pemilik yang dapat menghapus (DELETE)
CREATE POLICY "Users can delete own resumes"
    ON public.resumes
    FOR DELETE
    USING (auth.uid() = user_id);

-- 5. Fungsi dan Trigger untuk otomatis memperbarui updated_at
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
