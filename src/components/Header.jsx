import { sections, topics } from '../data/topics';

export default function Header() {
  const totalTopics = topics.length;
  const sectionsCount = sections.length;
  const totalEntries = topics.reduce((s, t) => s + t.companies.length, 0);
  const uniqueCompanies = new Set(topics.flatMap(t => t.companies.map(c => c.name))).size;

  const stats = [
    { value: totalTopics, label: 'Тем / задач' },
    { value: uniqueCompanies, label: 'Уникальных компаний' },
    { value: totalEntries, label: 'Упоминаний компаний' },
    { value: sectionsCount, label: 'Направлений' },
  ];

  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold mb-1">ML / AI в горнодобыче</h1>
      <p className="text-gray-500 mb-6 text-sm">Карта применений машинного обучения и искусственного интеллекта</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 shadow-sm rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
