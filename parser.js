const fs = require('fs').promises;
const db = require('../db/db');

function calcStats(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  const avg = sum / arr.length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const std = Math.sqrt(arr.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / arr.length);
  return { min, max, avg: avg.toFixed(2), std: std.toFixed(2) };
}

async function insertToDB(core, task, stat) {
  const sql = 'INSERT INTO profiler_data (core, task, min, max, avg, std) VALUES (?, ?, ?, ?, ?, ?)';
  await db.execute(sql, [core, task + 1, stat.min, stat.max, stat.avg, stat.std]);
}

module.exports = async (filePath) => {
  const raw = await fs.readFile(filePath, 'utf-8');
  const lines = raw.trim().split('\n').slice(1); // skip header
  const coreData = {};

  for (let line of lines) {
    const [core, ...values] = line.trim().split(/\s+/);
    if (!coreData[core]) coreData[core] = Array.from({ length: values.length }, () => []);
    values.forEach((val, idx) => coreData[core][idx].push(Number(val)));
  }

  const result = {};
  for (let core in coreData) {
    result[core] = [];
    for (let i = 0; i < coreData[core].length; i++) {
      const stat = calcStats(coreData[core][i]);
      result[core].push(stat);
      await insertToDB(core, i, stat);
    }
  }

  return result;
};
