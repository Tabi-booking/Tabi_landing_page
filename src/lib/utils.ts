import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const RESTAURANT_LOGIN_URL = 'https://restaurante.tabiapp.tech/login';
export const RESTAURANT_SIGNUP_URL = 'https://registro.tabiapp.tech/registro';
