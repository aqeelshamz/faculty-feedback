import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const feedbackFormColors = <any>{
    "red": {
        "lightBg": "#C3DDFD",
        "darkBg": "#1E429F",
        "text": "#1E429F",
    },
    "yellow": {
        "lightBg": "bg-yellow-50",
        "darkBg": "bg-yellow-700",
        "text": "text-yellow-700",
    },
    "green": {
        "lightBg": "bg-green-50",
        "darkBg": "bg-green-700",
        "text": "text-green-700",
    },
    "blue": {
        "lightBg": "bg-blue-50",
        "darkBg": "bg-blue-700",
        "text": "text-blue-700",
    },
};

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL; // https://campusapi.vercel.app
export { serverURL, feedbackFormColors };
