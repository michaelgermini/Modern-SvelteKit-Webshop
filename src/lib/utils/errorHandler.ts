// Error handling utilities for better user experience

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class PaymentError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'PaymentError';
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof ValidationError) {
    return {
      message: error.message,
      code: 'VALIDATION_ERROR',
      details: { field: error.field }
    };
  }

  if (error instanceof NetworkError) {
    return {
      message: error.message,
      code: 'NETWORK_ERROR',
      details: { status: error.status }
    };
  }

  if (error instanceof PaymentError) {
    return {
      message: error.message,
      code: 'PAYMENT_ERROR',
      details: { code: error.code }
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
      details: error
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    details: error
  };
}

export function logError(error: AppError, context?: string) {
  console.error(`[${error.code}] ${context ? `${context}: ` : ''}${error.message}`, error.details);
}

export function getErrorMessage(error: unknown): string {
  const appError = handleError(error);
  return appError.message;
}

// User-friendly error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Connection error. Please check your internet connection.',
  PAYMENT_ERROR: 'Payment failed. Please try again or contact support.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'Something went wrong. Please try again later.',
  CART_EMPTY: 'Your cart is empty.',
  PRODUCT_NOT_FOUND: 'Product not found.',
  INSUFFICIENT_STOCK: 'Not enough stock available.',
  INVALID_COUPON: 'Invalid coupon code.',
  EXPIRED_SESSION: 'Your session has expired. Please refresh the page.'
} as const;
