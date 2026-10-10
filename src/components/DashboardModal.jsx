import React, { useState } from 'react';
import {
  X,
  FileText,
  Plus,
  Trash2,
  Copy,
  Edit3,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  FolderOpen
} from 'lucide-react';

export default function DashboardModal({
  isOpen,
  onClose,
  resumes,
  currentResumeId,
  onSelectResume,
  onCreateNewResume,
  onDuplicateResume,
  onDeleteResume,
  isLoading
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredResumes = resumes.filter((r) =>
    (r.title || 'Resume Tanpa Judul').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Kelola CV Saya (Multi-CV Dashboard)</h3>
              <p className="text-xs text-slate-500">Buat, ganti, dan kelola beberapa versi resume untuk target lamaran berbeda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar (Search & New Resume Button) */}
        <div className="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari judul CV..."
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>

          <button
            onClick={onCreateNewResume}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all shadow-sm shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>+ Buat CV Baru</span>
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-50/50">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
              <p className="text-xs">Menyinkronkan data resume dari Supabase...</p>
            </div>
          ) : filteredResumes.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-xl border border-dashed border-slate-300 p-6">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="font-semibold text-sm text-slate-700">Belum ada dokumen CV ditemukan</h4>
              <p className="text-xs text-slate-500 mt-1">
                Klik tombol di atas untuk membuat resume pertama Anda yang tersimpan di cloud.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredResumes.map((resume) => {
                const isActive = resume.id === currentResumeId;
                return (
                  <div
                    key={resume.id}
                    className={`bg-white p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      isActive
                        ? 'border-blue-500 shadow-md ring-1 ring-blue-500/30'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <FileText className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                          <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                            {resume.title || 'Resume Tanpa Judul'}
                          </h4>
                        </div>
                        {isActive && (
                          <span className="shrink-0 bg-blue-100 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3 inline" />
                            <span>Sedang Dibuka</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-2">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Diperbarui: {formatDate(resume.updated_at || resume.created_at)}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          onSelectResume(resume);
                          onClose();
                        }}
                        disabled={isActive}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
                          isActive
                            ? 'bg-slate-100 text-slate-400 cursor-default'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                        }`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isActive ? 'Aktif di Editor' : 'Buka CV'}</span>
                      </button>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onDuplicateResume(resume)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Duplikat CV ini"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteResume(resume.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus CV ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Total: {resumes.length} resume tersimpan di cloud</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
