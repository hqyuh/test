const toCelsiusMap = {
  C: (v) => v,
  K: (v) => v - 273.15,
  F: (v) => ((v - 32) * 5) / 9,
};

const fromCelsiusMap = {
  C: (v) => v,
  K: (v) => v + 273.15,
  F: (v) => (v * 9) / 5 + 32,
};

const lengthToMeter = {
  m: 1,
  cm: 0.01,
  inch: 0.0254,
  feet: 0.3048,
  yard: 0.9144,
};

const meterToLength = {
  m: (m) => m,
  cm: (m) => m / 0.01,
  inch: (m) => m / 0.0254,
  feet: (m) => m / 0.3048,
  yard: (m) => m / 0.9144,
};

export function convertTemperature(arr, toUnit) {
  toUnit = toUnit.toUpperCase();

  if (!fromCelsiusMap[toUnit]) {
    throw new Error("Invalid unit");
  }

  return arr.map((item) => {
    const fromUnit = item.unit.toUpperCase();
    const value = item.value;
    if (!toCelsiusMap[fromUnit]) {
      throw new Error(`Invalid unit: ${item.unit}`);
    }
    const celsius = toCelsiusMap[fromUnit](value);
    const result = fromCelsiusMap[toUnit](celsius);
    return {
      ...item,
      value: parseFloat(result.toFixed(2)),
      unit: toUnit,
    };
  });
}

export function convertLengths(arr, toUnit) {
  toUnit = toUnit.toLowerCase();

  if (!meterToLength[toUnit]) {
    throw new Error("Invalid conversion unit");
  }

  return arr.map((item) => {
    const fromUnit = item.unit.toLowerCase();
    const value = item.value;
    if (!lengthToMeter[fromUnit]) {
      throw new Error(`Invalid unit: ${item.unit}`);
    }
    const valueInMeter = value * lengthToMeter[fromUnit];
    const convertedValue = meterToLength[toUnit](valueInMeter);
    return {
      ...item,
      value: parseFloat(convertedValue.toFixed(4)),
      unit: toUnit,
    };
  });
}
