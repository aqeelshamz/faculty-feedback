import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const feedbackFormColors = {
    "red": {
        "light": "bg-red-50",
        "dark": "bg-red-700",
    },
    "yellow": {
        "light": "bg-yellow-50",
        "dark": "bg-yellow-700",
    },
    "green": {
        "light": "bg-green-50",
        "dark": "bg-green-700",
    },
    "blue": {
        "light": "bg-blue-50",
        "dark": "bg-blue-700",
    },
};

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL; // https://campusapi.vercel.app
export { serverURL, feedbackFormColors };
