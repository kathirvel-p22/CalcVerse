// Mathematical formulas and calculations

export const calculateBMI = (weight, height) => {
  // BMI = weight (kg) / (height (m))^2
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const calculateEMI = (principal, rate, time) => {
  // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = rate / (12 * 100);
  const numberOfMonths = time * 12;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths) /
              (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  return emi;
};

export const calculateCompoundInterest = (principal, rate, time, compoundFrequency = 1) => {
  // A = P * (1 + r/n)^(nt)
  const amount = principal * Math.pow(1 + (rate / 100) / compoundFrequency, compoundFrequency * time);
  const interest = amount - principal;
  return { amount, interest };
};

export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const convertTemperature = (value, from, to) => {
  let celsius;

  // Convert to Celsius first
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * 5/9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      return value;
  }

  // Convert from Celsius to target unit
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return (celsius * 9/5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
};

export const convertCurrency = (amount, fromRate, toRate) => {
  return amount * (toRate / fromRate);
};

export const calculatePercentage = (value, percentage) => {
  return (value * percentage) / 100;
};

export const percentageOf = (part, whole) => {
  return (part / whole) * 100;
};

export const convertDataUnit = (value, fromUnit, toUnit) => {
  const units = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
    'TB': 1024 * 1024 * 1024 * 1024
  };

  const bytes = value * units[fromUnit.toUpperCase()];
  return bytes / units[toUnit.toUpperCase()];
};

export const convertLength = (value, fromUnit, toUnit) => {
  const units = {
    'mm': 0.001,
    'cm': 0.01,
    'm': 1,
    'km': 1000,
    'in': 0.0254,
    'ft': 0.3048,
    'yd': 0.9144,
    'mi': 1609.344
  };

  const meters = value * units[fromUnit.toLowerCase()];
  return meters / units[toUnit.toLowerCase()];
};

export const convertWeight = (value, fromUnit, toUnit) => {
  const units = {
    'mg': 0.001,
    'g': 1,
    'kg': 1000,
    'oz': 28.3495,
    'lb': 453.592,
    'ton': 1000000
  };

  const grams = value * units[fromUnit.toLowerCase()];
  return grams / units[toUnit.toLowerCase()];
};
