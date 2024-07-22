import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const wait = async (second: number) => {
  return new Promise<NodeJS.Timeout>((resolve) => setTimeout(resolve, second * 1000));
};
