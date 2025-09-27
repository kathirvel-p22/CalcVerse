// Input validation utilities

export const isValidNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value);
};

export const isPositiveNumber = (value) => {
  return isValidNumber(value) && parseFloat(value) > 0;
};

export const isNonNegativeNumber = (value) => {
  return isValidNumber(value) && parseFloat(value) >= 0;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export const isValidBirthDate = (dateString) => {
  if (!isValidDate(dateString)) return false;
  const birthDate = new Date(dateString);
  const today = new Date();
  return birthDate < today;
};

export const isValidPercentage = (value) => {
  return isValidNumber(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100;
};

export const isValidRate = (value) => {
  return isValidNumber(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100;
};

export const isValidPrincipal = (value) => {
  return isPositiveNumber(value);
};

export const isValidTime = (value) => {
  return isPositiveNumber(value) && parseFloat(value) <= 100; // Max 100 years
};

export const isValidHeight = (value) => {
  // Height in cm
  return isPositiveNumber(value) && parseFloat(value) >= 50 && parseFloat(value) <= 300;
};

export const isValidWeight = (value) => {
  // Weight in kg
  return isPositiveNumber(value) && parseFloat(value) >= 1 && parseFloat(value) <= 500;
};

export const isValidTemperature = (value) => {
  return isValidNumber(value) && parseFloat(value) >= -273.15; // Absolute zero
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

export const validateMinLength = (value, minLength) => {
  return String(value).length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return String(value).length <= maxLength;
};

export const validateRange = (value, min, max) => {
  const num = parseFloat(value);
  return num >= min && num <= max;
};

export const getValidationError = (fieldName, value, rules) => {
  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!validateRequired(value)) {
          return `${fieldName} is required`;
        }
        break;
      case 'number':
        if (!isValidNumber(value)) {
          return `${fieldName} must be a valid number`;
        }
        break;
      case 'positive':
        if (!isPositiveNumber(value)) {
          return `${fieldName} must be a positive number`;
        }
        break;
      case 'min':
        if (parseFloat(value) < rule.value) {
          return `${fieldName} must be at least ${rule.value}`;
        }
        break;
      case 'max':
        if (parseFloat(value) > rule.value) {
          return `${fieldName} must be at most ${rule.value}`;
        }
        break;
      case 'email':
        if (!isValidEmail(value)) {
          return `${fieldName} must be a valid email address`;
        }
        break;
      case 'date':
        if (!isValidDate(value)) {
          return `${fieldName} must be a valid date`;
        }
        break;
      default:
        break;
    }
  }
  return null;
};
