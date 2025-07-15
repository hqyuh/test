# Test Project

## Introduction

This is a Node.js REST API project that allows you to:

- Convert temperature units (C, F, K)
- Convert length units (m, cm, inch, feet, yard)
- Calculate the number of months between two dates (format DD/MM/YYYY) using [dayjs](https://day.js.org/)

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd everfit-test
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

```bash
npm start
```

## Project Structure

- `src/controllers/` - Route logic handlers
- `src/middlewares/` - Data validation middleware
- `src/repository/` - Data access layer
- `src/routes/` - Route definitions
- `src/services/` - Business logic
- `src/utils/` - Utility functions for conversion and calculation

## API Usage

### 1. Temperature Conversion

**POST** `/metrics`

```json
{
  "date": "2025-06-15",
  "value": 60,
  "type": "temperature",
  "unit": "F"
}
```

**Response:**

```json
{
  "id": 1
}
```

### 2. Get metrics by type (temperature, distance)

**GET** `/metrics?type=temperature`

**Response:**

```json
[
  {
    "id": 16,
    "date": "2025-06-30",
    "value": 60,
    "type": "temperature",
    "unit": "F",
    "created_at": "2025-07-15 15:40:10"
  },
  {
    "id": 15,
    "date": "2025-06-30",
    "value": 60,
    "type": "temperature",
    "unit": "F",
    "created_at": "2025-07-15 15:33:25"
  },
  {
    "id": 14,
    "date": "2025-06-30",
    "value": 60,
    "type": "temperature",
    "unit": "F",
    "created_at": "2025-07-15 15:21:45"
  },
  {
    "id": 13,
    "date": "2025-06-24",
    "value": 60,
    "type": "temperature",
    "unit": "F",
    "created_at": "2025-07-15 15:21:40"
  },
  {
    "id": 12,
    "date": "2025-06-24",
    "value": 60,
    "type": "temperature",
    "unit": "F",
    "created_at": "2025-07-15 14:58:14"
  },
  {
    "id": 11,
    "date": "2025-06-23",
    "value": 60,
    "type": "temperature",
    "unit": "K",
    "created_at": "2025-07-15 14:58:08"
  },
  {
    "id": 10,
    "date": "2025-06-22",
    "value": 60,
    "type": "temperature",
    "unit": "C",
    "created_at": "2025-07-15 14:58:03"
  },
  {
    "id": 9,
    "date": "2025-06-21",
    "value": 60,
    "type": "temperature",
    "unit": "C",
    "created_at": "2025-07-15 14:57:59"
  },
  {
    "id": 8,
    "date": "2025-06-21",
    "value": 50,
    "type": "temperature",
    "unit": "C",
    "created_at": "2025-07-15 14:57:52"
  },
  {
    "id": 7,
    "date": "2025-06-20",
    "value": 30,
    "type": "temperature",
    "unit": "C",
    "created_at": "2025-07-15 14:57:47"
  }
]
```

### 3. Calculate Month Difference Between Two Dates

**GET** `metrics?type=temperature&unit=F&start_date=2025-07-24&end_date=2025-08-24`
**Response:**

```json
[
  {
    "id": 21,
    "type": "temperature",
    "value": 60,
    "unit": "F",
    "date": "2025-07-30",
    "created_at": "2025-07-15 15:52:57"
  },
  {
    "id": 22,
    "type": "temperature",
    "value": 100,
    "unit": "F",
    "date": "2025-08-01",
    "created_at": "2025-07-15 15:53:06"
  },
  {
    "id": 23,
    "type": "temperature",
    "value": 100,
    "unit": "F",
    "date": "2025-08-10",
    "created_at": "2025-07-15 15:53:10"
  },
  {
    "id": 24,
    "type": "temperature",
    "value": 100,
    "unit": "F",
    "date": "2025-08-20",
    "created_at": "2025-07-15 15:53:13"
  }
]
```

## Notes

- Make sure to input dates in the `YYYY-MM-DD` format.
- The APIs validate input data and return errors if invalid.

## License

MIT
