// validate body
export function validateMetricBody(req, res, next) {
  const { date, value, type, unit } = req.body;
  if (!date || !value || !type || !unit) {
    return res.status(400).json({ error: "Invalid body" });
  }
  if (!["distance", "temperature"].includes(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }
  if (
    type === "distance" &&
    !["m", "cm", "inch", "feet", "yard"].includes(unit)
  ) {
    return res.status(400).json({ error: "Invalid unit for distance" });
  }
  if (type === "temperature" && !["C", "F", "K"].includes(unit)) {
    return res.status(400).json({ error: "Invalid unit for temperature" });
  }
  next();
}
