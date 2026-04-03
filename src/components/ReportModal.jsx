import { useEffect } from 'react';
import { X, ExternalLink, Zap, Cpu, TrendingUp, Shield } from 'lucide-react';

function verdictColor(verdict) {
  if (!verdict) return 'bg-gray-100 text-gray-700';
  const v = verdict.toLowerCase();
  if (v.startsWith('mainstream')) return 'bg-green-100 text-green-800';
  if (v.startsWith('зрелая')) return 'bg-blue-100 text-blue-800';
  if (v.startsWith('развивающаяся')) return 'bg-amber-100 text-amber-800';
  if (v.startsWith('frontier')) return 'bg-purple-100 text-purple-800';
  return 'bg-gray-100 text-gray-700';
}

export default function ReportModal({ report, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-0 sm:p-4 sm:pt-12 overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white sm:rounded-xl shadow-2xl max-w-2xl w-full min-h-screen sm:min-h-0 sm:my-4 animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white sm:rounded-t-xl border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex items-start justify-between gap-3 z-10">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">{report.title}</h2>
            <span className={`inline-block mt-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${verdictColor(report.maturityVerdict)}`}>
              {report.maturityVerdict?.split('—')[0]?.trim()}
            </span>
          </div>
          <button onClick={onClose} className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
          {/* Summary */}
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">{report.summary}</p>
          </div>

          {/* How it works */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={16} className="text-indigo-500" />
              <h3 className="text-sm font-semibold text-gray-800">Как это работает</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{report.howItWorks}</p>
          </div>

          {/* Companies */}
          {report.companies?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-amber-500" />
                <h3 className="text-sm font-semibold text-gray-800">Компании и решения</h3>
              </div>
              <div className="space-y-3">
                {report.companies.map((c, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{c.name}</span>
                      {c.url && (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Effect */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-green-500" />
              <h3 className="text-sm font-semibold text-gray-800">Бизнес-эффект</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{report.businessEffect}</p>
          </div>

          {/* Maturity */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-blue-500" />
              <h3 className="text-sm font-semibold text-gray-800">Зрелость технологии</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{report.maturityVerdict}</p>
          </div>

          {/* Sources */}
          {report.sources?.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Источники</h3>
              <div className="flex flex-wrap gap-1.5">
                {report.sources.map((s, i) => {
                  let domain;
                  try { domain = new URL(s).hostname.replace('www.', ''); } catch { domain = s; }
                  return (
                    <a
                      key={i} href={s} target="_blank" rel="noopener noreferrer"
                      className="text-xs bg-gray-100 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition truncate max-w-[200px]"
                      title={s}
                    >
                      {domain}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
