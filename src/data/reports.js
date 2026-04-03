// Auto-import all report JSON files
const reportModules = import.meta.glob('./reports/*.json', { eager: true });

const reports = {};
for (const path in reportModules) {
  const data = reportModules[path].default || reportModules[path];
  if (data.topicId) {
    reports[data.topicId] = data;
  }
}

export function getReport(topicId) {
  return reports[topicId] || null;
}

export function hasReport(topicId) {
  return topicId in reports;
}

export default reports;
