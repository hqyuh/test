import { Router } from "express";
import { postMetric, getMetrics } from "../controllers/metric.controller.js";
import { validateMetricParams } from "../middlewares/validate-params.middleware.js";
import { handleValidationResult } from "../middlewares/validate-body.middleware.js";
import { metricValidationRules } from "../validate/metric.validate.js";

const router = Router();

export default () => {
  router.post(
    "/metrics",
    metricValidationRules,
    handleValidationResult,
    postMetric
  );
  router.get("/metrics", validateMetricParams, getMetrics);
  return router;
};
