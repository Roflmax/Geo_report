import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { hasReport } from '../data/reports';

function badge(count) {
  if (count >= 5) return { bg: 'bg-green-100 text-green-800', label: 'Mainstream' };
  if (count === 4) return { bg: 'bg-blue-100 text-blue-800', label: 'Зрелая' };
  if (count === 3) return { bg: 'bg-amber-100 text-amber-800', label: 'Развивающаяся' };
  return { bg: 'bg-gray-100 text-gray-600', label: 'Frontier' };
}

export default function TopicCard({ topic, onOpenReport }) {
  const [open, setOpen] = useState(false);
  const b = badge(topic.companies.length);
  const reportAvailable = hasReport(topic.id);

  return (
    <div
      onClick={() => setOpen(o => !o)}
      className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-gray-800 leading-snug flex-1">{topic.name}</p>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${b.bg}`}>
          {topic.companies.length} &middot; {b.label}
        </span>
      </div>

      {open && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <ul className="space-y-1.5">
            {topic.companies.map((c, i) => (
              <li key={i} className="flex items-center gap-1.5 text-sm text-gray-700">
                <span>{c.name}</span>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </li>
            ))}
          </ul>

          {reportAvailable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenReport(topic.id);
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg transition"
            >
              <FileText size={15} />
              Подробный отчёт
            </button>
          )}
        </div>
      )}

      <div className="flex justify-center mt-2 text-gray-400">
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
    </div>
  );
}
