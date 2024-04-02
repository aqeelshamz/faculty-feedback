import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const serverURL = process.env.SERVER_URL; // https://campusapi.vercel.app
export { serverURL };
