// Insert metric
export function insertMetric(db, { date, value, type, unit }) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "INSERT INTO metrics (date, value, type, unit) VALUES (?, ?, ?, ?)"
    );
    stmt.run(date, value, type, unit, function (err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
    stmt.finalize();
  });
}

// Get all metrics by type
export function getMetricsByType(db, type) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM metrics WHERE type = ? ORDER BY created_at DESC",
      [type],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

// Get chart data: latest record per day in range
export async function getMetricsChart(
  db,
  { type, _unit, start_date, end_date }
) {
  try {
    const data = await new Promise((resolve, reject) => {
      let sql = `
        SELECT t.id, t.type, t.value, t.unit, t.date, t.created_at
        FROM metrics t
        JOIN (
          SELECT date, MAX(created_at) AS max_created_at
          FROM metrics
          GROUP BY date
        ) sub
        ON t.date = sub.date AND t.created_at = sub.max_created_at
        WHERE t.type = ?
          AND DATE(t.date) >= DATE(?)
          AND DATE(t.date) <= DATE(?)
      `;
      db.all(sql, [type, start_date, end_date], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}
