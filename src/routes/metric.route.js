import { Router } from "express";
import { postMetric, getMetrics } from "../controllers/metric.controller.js";
import { validateMetricBody } from "../middlewares/validateMetricBody.middleware.js";
import { validateMetricParams } from "../middlewares/validateMetricParams.middleware.js";
const router = Router();

export default () => {
  router.post("/metrics", validateMetricBody, postMetric);
  router.get("/metrics", validateMetricParams, getMetrics);
  return router;
};
