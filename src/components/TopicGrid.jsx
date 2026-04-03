import { sections } from '../data/topics';
import TopicCard from './TopicCard';

export default function TopicGrid({ filteredTopics }) {
  // Group by section
  const grouped = sections
    .map(s => {
      const sTopics = filteredTopics
        .filter(t => t.sectionId === s.id)
        .sort((a, b) => b.companies.length - a.companies.length);
      const avg = sTopics.length ? sTopics.reduce((a, t) => a + t.companies.length, 0) / sTopics.length : 0;
      return { section: s, topics: sTopics, avg };
    })
    .filter(g => g.topics.length > 0)
    .sort((a, b) => b.avg - a.avg);

  if (grouped.length === 0) {
    return <p className="text-gray-400 text-center py-12">Ничего не найдено</p>;
  }

  return (
    <div className="space-y-8">
      {grouped.map(g => (
        <div key={g.section.id}>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{g.section.name}</h2>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{g.topics.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.topics.map(t => <TopicCard key={t.id} topic={t} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
