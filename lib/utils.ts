import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const serverURL = "http://localhost:5000"; // https://campusapi.vercel.app
export { serverURL };
