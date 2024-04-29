import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const feedbackFormColors = <any>{
    black: {
        lightBg: "#C3DDFD",
        darkBg: "#000000",
        text: "#1E429F",
    },
    red: {
        lightBg: "#C3DDFD",
        darkBg: "#eb4034",
        text: "#1E429F",
    },
    yellow: {
        lightBg: "#C3DDFD",
        darkBg: "#ebc334",
        text: "#1E429F",
    },
    green: {
        lightBg: "#C3DDFD",
        darkBg: "#68eb34",
        text: "#1E429F",
    },
    blue: {
        lightBg: "#C3DDFD",
        darkBg: "#3262e6",
        text: "#1E429F",
    },
};

function formatDateString(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return `${formattedDate}`;
}

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL; // https://campusapi.vercel.app
export { serverURL, feedbackFormColors, formatDateString };
