import { sections, topics } from '../data/topics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function getMaturityData() {
  let mainstream = 0, mature = 0, developing = 0, frontier = 0;
  topics.forEach(t => {
    const c = t.companies.length;
    if (c >= 5) mainstream++;
    else if (c === 4) mature++;
    else if (c === 3) developing++;
    else frontier++;
  });
  return [
    { name: 'Mainstream (5+)', value: mainstream, color: '#22c55e' },
    { name: 'Зрелые (4)', value: mature, color: '#3b82f6' },
    { name: 'Развивающиеся (3)', value: developing, color: '#f59e0b' },
    { name: 'Frontier (≤2)', value: frontier, color: '#9ca3af' },
  ];
}

function getTopCompanies() {
  const map = {};
  topics.forEach(t => t.companies.forEach(c => { map[c.name] = (map[c.name] || 0) + 1; }));
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([name, count]) => ({ name, count }));
}

function getSectionCoverage() {
  return sections
    .map(s => {
      const st = topics.filter(t => t.sectionId === s.id);
      const avg = st.length ? st.reduce((a, t) => a + t.companies.length, 0) / st.length : 0;
      return { name: s.name.length > 30 ? s.name.slice(0, 28) + '…' : s.name, avg: +avg.toFixed(1) };
    })
    .sort((a, b) => b.avg - a.avg);
}

export default function Analytics() {
  const maturity = getMaturityData();
  const topCompanies = getTopCompanies();
  const coverage = getSectionCoverage();

  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ChartCard title="Распределение по зрелости">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={maturity} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {maturity.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Топ-15 компаний по числу тем">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={topCompanies} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Среднее покрытие по направлениям">
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={coverage} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="avg" fill="#14b8a6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      {children}
    </div>
  );
}
