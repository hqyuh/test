import dayjs from "dayjs";

export function parseDateRange(startDateStr, endDateStr) {
  const start = dayjs(startDateStr, "YYYY-MM-DD");
  const end = dayjs(endDateStr, "YYYY-MM-DD");

  if (!start.isValid() || !end.isValid()) {
    throw new Error("Invalid date format. Use YYYY-mm-dd");
  }

  if (end.isBefore(start)) {
    throw new Error("end_date must be after start_date");
  }

  const diffMonths = end.diff(start, "month", true);
  if (diffMonths < 1) {
    throw new Error("start_date and end_date must be at least 1 month apart");
  }
}
