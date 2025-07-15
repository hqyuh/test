import {
  createMetric,
  fetchMetricsByType,
  fetchMetricsChart,
} from "../services/metric.service.js";
import { parseDateRange } from "../utils/date.js";
import { Created, OK } from "../core/success.response.js";

export async function postMetric(req, res) {
  const db = req.app.locals.db;
  const { date, value, type, unit } = req.body;
  const id = await createMetric(db, { date, value, type, unit });

  new Created({
    message: "Create successfully",
    content: { id },
    path: req.originalUrl,
  }).send(res);
}

export async function getMetrics(req, res) {
  const db = req.app.locals.db;
  const { type, unit, start_date, end_date } = req.query;

  let rows;
  if (unit && start_date && end_date) {
    parseDateRange(start_date, end_date);
    rows = await fetchMetricsChart(db, {
      type,
      unit,
      start_date,
      end_date,
    });
  } else {
    rows = await fetchMetricsByType(db, type);
  }
  new OK({
    message: "Get Metrics successfully",
    content: rows,
    path: req.originalUrl,
  }).send(res);
}
