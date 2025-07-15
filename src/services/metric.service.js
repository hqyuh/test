import {
  insertMetric,
  getMetricsByType,
  getMetricsChart,
} from "../repository/metric.repository.js";
import { convertTemperature, convertLengths } from "../utils/convert.js";

export async function createMetric(db, metric) {
  return await insertMetric(db, metric);
}

export async function fetchMetricsByType(db, type) {
  return await getMetricsByType(db, type);
}

export async function fetchMetricsChart(
  db,
  { type, unit, start_date, end_date }
) {
  const data = await getMetricsChart(db, { type, unit, start_date, end_date });

  if (type === "temperature") {
    return convertTemperature(data, unit);
  }

  return convertLengths(data, unit);
}
