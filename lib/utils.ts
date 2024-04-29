import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const feedbackFormColors = <any>{
    "black": {
        "lightBg": "#C3DDFD",
        "darkBg": "#000000",
        "text": "#1E429F",
    },
    "red": {
        "lightBg": "#C3DDFD",
        "darkBg": "#eb4034",
        "text": "#1E429F",
    },
    "yellow": {
        "lightBg": "#C3DDFD",
        "darkBg": "#ebc334",
        "text": "#1E429F",
    },
    "green": {
        "lightBg": "#C3DDFD",
        "darkBg": "#68eb34",
        "text": "#1E429F",
    },
    "blue": {
        "lightBg": "#C3DDFD",
        "darkBg": "#3262e6",
        "text": "#1E429F",
    },
};

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL; // https://campusapi.vercel.app
export { serverURL, feedbackFormColors };
