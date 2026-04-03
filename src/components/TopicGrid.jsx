import { sections } from '../data/topics';
import TopicCard from './TopicCard';

// Curated order: lead with impressive money-makers, end with compliance/infra
const SECTION_ORDER = [
  4,  // Транспортировка — автономные самосвалы, 3800+ единиц, миллиарды тонн
  1,  // Геологоразведка — AI находит медь за $537M, успешность 66%
  7,  // Переработка — +10-15% извлечения, mine-to-mill
  13, // Цепочка поставок — mine-to-port, окупаемость <3 мес
  3,  // Бурение и взрывы — +10% извлечения руды, автономное бурение
  5,  // Экскавация — автономные экскаваторы, грейд-контроль
  6,  // Предиктивное ТО — $27M/год экономии BHP
  15, // Генеративный AI — Copilot, LLM, 2200 ч/мес экономии
  14, // Цифровые двойники — ROI 20-40X
  2,  // Планирование — NPV +50%, сценарии
  11, // Вода и энергия — 50% экономии вентиляции
  8,  // Безопасность — 91% снижение аварий, но после $$$
  9,  // Геотехника — slope stability, InSAR
  12, // Дроны и маркшейдерия — точность 3 см, минуты вместо дней
  10, // Экология — рекультивация, AMD, compliance
  16, // Доп. применения
  18, // Академические
];

export default function TopicGrid({ filteredTopics, onOpenReport }) {
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
    .sort((a, b) => {
      const aIdx = SECTION_ORDER.indexOf(a.section.id);
      const bIdx = SECTION_ORDER.indexOf(b.section.id);
      const aPos = aIdx === -1 ? 999 : aIdx;
      const bPos = bIdx === -1 ? 999 : bIdx;
      return aPos - bPos;
    });

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {g.topics.map(t => <TopicCard key={t.id} topic={t} onOpenReport={onOpenReport} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
