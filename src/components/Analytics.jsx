import { sections, topics } from '../data/topics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

function compute() {
  let mainstream = 0, mature = 0, developing = 0, frontier = 0;
  topics.forEach(t => {
    const c = t.companies.length;
    if (c >= 5) mainstream++;
    else if (c === 4) mature++;
    else if (c === 3) developing++;
    else frontier++;
  });

  const companies = {};
  topics.forEach(t => t.companies.forEach(c => { companies[c.name] = (companies[c.name] || 0) + 1; }));
  const uniqueCount = Object.keys(companies).length;
  const topCompanies = Object.entries(companies).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, count]) => ({ name, count }));

  const readyPct = Math.round((mainstream + mature) / topics.length * 100);

  const maturity = [
    { name: 'Mainstream (5+)', value: mainstream, color: '#22c55e', pct: Math.round(mainstream / topics.length * 100) },
    { name: 'Зрелые (4)', value: mature, color: '#3b82f6', pct: Math.round(mature / topics.length * 100) },
    { name: 'Развивающиеся (3)', value: developing, color: '#f59e0b', pct: Math.round(developing / topics.length * 100) },
    { name: 'Frontier (≤2)', value: frontier, color: '#9ca3af', pct: Math.round(frontier / topics.length * 100) },
  ];

  return { mainstream, mature, developing, frontier, uniqueCount, topCompanies, readyPct, maturity };
}

export default function Analytics() {
  const d = compute();

  return (
    <div className="mb-8">
      {/* Three insight cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Card 1: This is not hype */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Масштаб обзора</p>
          <h3 className="text-base font-bold text-gray-900 mt-1.5 leading-snug">
            Мы нашли {topics.length} конкретных задач, которые AI уже решает на рудниках
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            {d.uniqueCount} компаний предлагают решения в {sections.length} направлениях — от геологоразведки
            и автономного транспорта до генеративного AI для отчётов.
          </p>
          <div className="mt-4 flex gap-6">
            <Metric value={topics.length} label="задач" />
            <Metric value={d.uniqueCount} label="компаний" />
            <Metric value={sections.length} label="направлений" />
          </div>
        </div>

        {/* Card 2: Maturity — ready to deploy */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Готовность к внедрению</p>
          <h3 className="text-base font-bold text-gray-900 mt-1.5 leading-snug">
            {d.readyPct}% технологий уже зрелые — с конкуренцией вендоров и кейсами
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Это не исследования — для {d.mainstream + d.mature} из {topics.length} тем есть 4+ конкурирующих вендора.
            Только {d.frontier} тем ({d.maturity[3].pct}%) пока на стадии пилотов.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <ResponsiveContainer width={90} height={90}>
              <PieChart>
                <Pie data={d.maturity} dataKey="value" cx="50%" cy="50%" innerRadius={24} outerRadius={42} paddingAngle={2} strokeWidth={0}>
                  {d.maturity.map((m, i) => <Cell key={i} fill={m.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 flex-1">
              {d.maturity.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: m.color }} />
                  <span className="text-[11px] text-gray-500 flex-1">{m.name}</span>
                  <span className="text-[11px] font-semibold text-gray-700">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Who to talk to */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide">С кем разговаривать</p>
          <h3 className="text-base font-bold text-gray-900 mt-1.5 leading-snug">
            Топ-10 вендоров покрывают задачи от разведки до переработки
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Число направлений, в которых компания предлагает AI-решения.
            Чем шире покрытие — тем больше вариантов для интеграции.
          </p>
          <div className="mt-3">
            <ResponsiveContainer width="100%" height={175}>
              <BarChart data={d.topCompanies} layout="vertical" margin={{ left: 0, right: 10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [`${v} тем`, 'Покрытие']} />
                <Bar dataKey="count" fill="#7c3aed" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-[11px] text-gray-400">{label}</div>
    </div>
  );
}
