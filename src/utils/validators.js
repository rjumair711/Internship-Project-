// src/utils/validator.js

export function cn(...args) {
    return args.filter(Boolean).join(' ');
  }
  