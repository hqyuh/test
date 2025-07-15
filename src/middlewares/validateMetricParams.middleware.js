import { parseDateRange } from "../utils/date.js";

export function validateMetricParams(req, res, next) {
  const { unit, type, start_date, end_date } = req.query;

  if (!["distance", "temperature"].includes(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }
  if (
    type === "distance" &&
    unit &&
    !["m", "cm", "inch", "feet", "yard"].includes(unit.toLowerCase())
  ) {
    return res.status(400).json({ error: "Invalid unit for distance" });
  }
  if (
    type === "temperature" &&
    unit &&
    !["C", "F", "K"].includes(unit.toUpperCase())
  ) {
    return res.status(400).json({ error: "Invalid unit for temperature" });
  }

  parseDateRange(start_date, end_date);

  next();
}
