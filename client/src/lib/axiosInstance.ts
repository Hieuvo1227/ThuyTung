﻿﻿﻿﻿﻿import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

/**
 * 🔧 Enum cho các loại HTTP method
 */
export enum EHttpType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

/**
 * 🧩 Interface chuẩn hóa response
 */
export interface IApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
}

/**
 * 🔧 Tạo axios instance chính cho toàn bộ app
 */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4040/api/v1",
    timeout: 15000,
    withCredentials: true,
});

/**
 * 🧠 Lấy token từ cookies (client-side)
 */
const getTokenFromCookies = (): string | null => {
    if (typeof document === "undefined") return null;
    
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
    
    if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        return token;
    }
    
    return null;
};

const getAccessToken = (): string | null => {
    const cookieToken = getTokenFromCookies();
    if (cookieToken) return cookieToken;
    
    if (typeof window === "undefined") return null;
    const localToken = localStorage.getItem("accessToken");
    if (localToken) return localToken;
    
    return null;
};

const getRefreshToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
};

/**
 * 🚀 Request Interceptor
 * Note: HttpOnly cookies are sent automatically by browser with withCredentials: true
 * We don't need to manually add Authorization header for cookie-based auth
 */
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        console.log("📤 Axios Request:", {
            method: config.method,
            url: config.url,
            baseURL: config.baseURL,
            headers: config.headers,
            data: config.data
        });
        
        // Set Content-Type to application/json for non-FormData requests
        if (!(config.data instanceof FormData)) {
            config.headers.set("Content-Type", "application/json");
        }
        // If data is FormData, let browser set Content-Type automatically with boundary
        
        const localToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
        if (localToken) {
            config.headers.set("Authorization", `Bearer ${localToken}`);
        }
        
        return config;
    },
    (error: AxiosError) => {
        console.log("❌ Axios Request Error:", error);
        return Promise.reject(error);
    }
);

/**
 * ♻️ Response Interceptor
 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("📥 Axios Response:", {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data
        });
        return response;
    },
    async (error: AxiosError) => {
        console.log("❌ Axios Response Error:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
        });
        
        if (error.response?.status === 401) {
            // Clear local storage and redirect to login
            if (typeof window !== "undefined") {
                console.log("🧹 Clearing auth tokens and redirecting to login");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/auth/login";
            }
        }

        return Promise.reject(error);
    }
);

/**
 * 🧩 Các hàm gọi API cơ bản
 */
export const getData = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    console.log("📥 getData called with URL:", url);
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
};

export const postData = async <T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
): Promise<T> => {
    console.log("📤 postData called with URL:", url, "Data:", data);
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
};

export const putData = async <T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
): Promise<T> => {
    console.log("🔄 putData called with URL:", url, "Data:", data);
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
};

export const patchData = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
): Promise<T> => {
    console.log("🔧 patchData called with URL:", url, "Data:", data);
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
};

export const deleteData = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    console.log("🗑️ deleteData called with URL:", url);
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
};

/**
 * ⚙️ Hàm tổng quát xử lý request cho store
 */
export const handleRequest = async <T>(
    method: EHttpType,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
): Promise<IApiResponse<T>> => {
    console.log("⚡ handleRequest called with:", { method, url, data });
    
    try {
        let responseData: T | undefined;

        switch (method) {
            case EHttpType.GET:
                responseData = await getData<T>(url, config);
                break;
            case EHttpType.POST:
                responseData = await postData<T>(url, data as Record<string, unknown>, config);
                break;
            case EHttpType.PUT:
                responseData = await putData<T>(url, data as Record<string, unknown>, config);
                break;
            case EHttpType.PATCH:
                responseData = await patchData<T>(url, data, config);
                break;
            case EHttpType.DELETE:
                responseData = await deleteData<T>(url, config);
                break;
        }

        console.log("✅ handleRequest successful with data:", responseData);
        return { success: true, data: responseData };
    } catch (error: unknown) {
        console.log("❌ handleRequest failed with error:", error);
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message:
                    (error.response?.data as { message?: string })?.message ||
                    error.message,
            };
        }
        return { success: false, message: "Unexpected error occurred" };
    }
};

/**
 * ✅ Xuất mặc định
 */
export default axiosInstance;