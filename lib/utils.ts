import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const feedbackFormColors = <any>{
    black: {
        lightBg: "#ffffff",
        darkBg: "#000000",
        text: "#000000",
    },
    red: {
        lightBg: "#ffa7a1",
        darkBg: "#eb4034",
        text: "#5c110c",
    },
    yellow: {
        lightBg: "#ffefb0",
        darkBg: "#ebc334",
        text: "#423916",
    },
    green: {
        lightBg: "#c7f5b5",
        darkBg: "#68eb34",
        text: "#1e4011",
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
