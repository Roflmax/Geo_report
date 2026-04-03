import { useState, useMemo, useCallback } from 'react';
import { topics } from './data/topics';
import { getReport } from './data/reports';
import Header from './components/Header';
import Analytics from './components/Analytics';
import FilterBar from './components/FilterBar';
import TopicGrid from './components/TopicGrid';
import ReportModal from './components/ReportModal';

export default function App() {
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState(null);
  const [maturityFilter, setMaturityFilter] = useState(null);
  const [activeReport, setActiveReport] = useState(null);

  const handleOpenReport = useCallback((topicId) => {
    setActiveReport(getReport(topicId));
  }, []);

  const filtered = useMemo(() => {
    let list = topics;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.companies.some(c => c.name.toLowerCase().includes(q))
      );
    }
    if (sectionFilter != null) {
      list = list.filter(t => t.sectionId === sectionFilter);
    }
    if (maturityFilter != null) {
      if (maturityFilter === 5) list = list.filter(t => t.companies.length >= 5);
      else if (maturityFilter === 2) list = list.filter(t => t.companies.length <= 2);
      else list = list.filter(t => t.companies.length === maturityFilter);
    }
    return list;
  }, [search, sectionFilter, maturityFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        <Analytics />
        <FilterBar
          search={search} onSearch={setSearch}
          sectionFilter={sectionFilter} onSectionFilter={setSectionFilter}
          maturityFilter={maturityFilter} onMaturityFilter={setMaturityFilter}
        />
        <TopicGrid filteredTopics={filtered} onOpenReport={handleOpenReport} />

        {activeReport && (
          <ReportModal report={activeReport} onClose={() => setActiveReport(null)} />
        )}

        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          Данные собраны на основе обзоров BCG, McKinsey, Deloitte и академических публикаций (2023-2026). Апрель 2026.
        </footer>
      </div>
    </div>
  );
}
