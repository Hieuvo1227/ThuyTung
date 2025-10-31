/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const darkMode = "class";
export const theme = {
    extend: {
        colors: {
            primary: {
                50: "#ecfdf5",
                100: "#d1fae5",
                200: "#a7f3d0",
                300: "#6ee7b7",
                400: "#34d399",
                500: "#10b981",
                600: "#059669",
                700: "#047857",
                DEFAULT: "#0b803c",
            },
            secondary: {
                50: "#eff6ff",
                100: "#dbeafe",
                200: "#bfdbfe",
                300: "#93c5fd",
                400: "#60a5fa",
                500: "#3b82f6",
                600: "#2563eb",
                700: "#1d4ed8",
                DEFAULT: "#0071BC",
            },
        },
        animation: {
            'pulse-scale': 'pulse-scale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
            'pulse-scale': {
                '0%, 100%': {
                    transform: 'scale(1)',
                },
                '50%': {
                    transform: 'scale(1.1)',
                },
            },
        },
    },
};
export const plugins = [];