import { body } from "express-validator";

export const metricValidationRules = [
  body("date").isString().notEmpty(),
  body("value").isNumeric(),
  body("type").isIn(["distance", "temperature"]),
  body("unit").custom((unit, { req }) => {
    if (req.body.type === "distance") {
      return ["m", "cm", "inch", "feet", "yard"].includes(unit);
    }
    if (req.body.type === "temperature") {
      return ["C", "F", "K"].includes(unit);
    }
    return false;
  }),
];
