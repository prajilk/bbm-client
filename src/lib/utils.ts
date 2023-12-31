import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrentDate(_date?: Date) {
    let date = _date || new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

export function formateDateString(date: Date) {
    const DATE = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(DATE);
    return formattedDate;
}

export function getDistanceFromLatLonInKm(coor1: string, coor2: string) {
    const lat1 = coor1.split(",")[0];
    const lon1 = coor1.split(",")[1];
    const lat2 = coor2.split(",")[0];
    const lon2 = coor2.split(",")[1];

    const R = 6371000; // Radius of the earth in m
    const dLat = deg2rad(Number(lat2) - Number(lat1)); // deg2rad below
    const dLon = deg2rad(Number(lon2) - Number(lon1));
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(Number(lat1))) *
            Math.cos(deg2rad(Number(lat2))) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in m
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

export const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
};
