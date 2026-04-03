import { sections } from '../data/topics';
import { Search } from 'lucide-react';

const chips = [
  { label: 'Все', value: null },
  { label: 'Mainstream (5)', value: 5 },
  { label: 'Зрелые (4)', value: 4 },
  { label: 'Развивающиеся (3)', value: 3 },
  { label: 'Frontier (2)', value: 2 },
];

export default function FilterBar({ search, onSearch, sectionFilter, onSectionFilter, maturityFilter, onMaturityFilter }) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Поиск по теме или компании..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      <select
        value={sectionFilter ?? ''}
        onChange={e => onSectionFilter(e.target.value ? Number(e.target.value) : null)}
        className="w-full md:w-auto py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option value="">Все направления</option>
        {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <div className="flex gap-2 flex-wrap">
        {chips.map(c => (
          <button
            key={c.label}
            onClick={() => onMaturityFilter(c.value)}
            className={`px-3 py-1.5 text-xs rounded-full border transition ${
              maturityFilter === c.value
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
