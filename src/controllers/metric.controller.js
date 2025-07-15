import {
  createMetric,
  fetchMetricsByType,
  fetchMetricsChart,
} from "../services/metric.service.js";

export async function postMetric(req, res) {
  const db = req.app.locals.db;
  const { date, value, type, unit } = req.body;
  try {
    const id = await createMetric(db, { date, value, type, unit });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

export async function getMetrics(req, res) {
  const db = req.app.locals.db;
  const { type, unit, start_date, end_date } = req.query;

  try {
    if (unit && start_date && end_date) {
      const rows = await fetchMetricsChart(db, {
        type,
        unit,
        start_date,
        end_date,
      });
      return res.json(rows);
    }
    const rows = await fetchMetricsByType(db, type);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
}
