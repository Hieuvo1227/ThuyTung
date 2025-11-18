import type { NextConfig } from "next";
import type webpack from "webpack";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    compress: true,

    turbopack: {},

    images: {
        remotePatterns: [
            { protocol: "http", hostname: "localhost", port: "4040", pathname: "/**" },
            { protocol: "https", hostname: "placehold.co" },
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "loremflickr.com" },
        ],
        localPatterns: [
            {
                pathname: "/images/**",
                search: "",
            },
            {
                pathname: "/svg/**",
                search: "",
            },
        ],
        formats: ["image/webp", "image/avif"],
        minimumCacheTTL: 31536000,
        dangerouslyAllowSVG: true,
        contentDispositionType: "inline",
    },

    experimental: {
        optimizePackageImports: ["lucide-react", "@heroicons/react"],
    },

    webpack(config: webpack.Configuration, { dev, isServer }) {
        config.module = config.module || {};
        config.module.rules = config.module.rules || [];
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        if (!dev && !isServer) {
            config.optimization = config.optimization || {};
            config.optimization.splitChunks = {
                chunks: "all",
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            };
        }

        return config;
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "X-XSS-Protection", value: "1; mode=block" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                ],
            },
        ];
    },

    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
