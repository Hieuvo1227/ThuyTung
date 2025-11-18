import { EHttpType, handleRequest, IApiResponse } from "@/lib/axiosInstance";
import { createStore, EStorageType, IBaseStore } from "@/lib/initialStore";
import { useUserStore } from './userStore';
import { useContactStore } from "./contactStore";
import { useFAQStore } from "./faqStore";
import { useProgramStore } from "./programStore";
import { useSystemStore } from "./systemStore";

interface IAuthDataResponse {
	user: IUser;
	isActive: boolean;
}

export interface IAuthStore extends IBaseStore {
	userAuth: IUser | null;

	login: (email: string, password: string) => Promise<IApiResponse<IAuthDataResponse>>;
	logout: () => Promise<IApiResponse>;
	sendOTP: (email: string) => Promise<IApiResponse>;
	verifyOTP: (email: string, otp: string) => Promise<IApiResponse>;
	resetPassword: (email: string) => Promise<IApiResponse>;
	forgotPassword: (email: string, password: string, confirmPassword: string) => Promise<IApiResponse>;
	changePassword: (email: string, oldPassword: string, password: string, confirmPassword: string) => Promise<IApiResponse>;

	handleSetUserAuth: (user: IUser) => void;
}

const storeName = "auth";
const initialState = {
	userAuth: null,
};

export const useAuthStore = createStore<IAuthStore>(
	storeName,
	initialState,
	(set, get) => ({

		login: async (email: string, password: string): Promise<IApiResponse<IAuthDataResponse>> => {
			console.log("🔐 AuthStore: Attempting login for email:", email);
			const formData = new FormData();
			formData.append("email", email);
			formData.append("password", password);

			return await get().handleRequest(async () => {
				console.log("📤 AuthStore: Sending login request to server");
				const response = await handleRequest<IAuthDataResponse>(EHttpType.POST, "/auth/login", formData);
				console.log("📥 AuthStore: Received login response:", response);
				
				if (response && response.data) {
					console.log("✅ AuthStore: Login successful, setting user data");
					set({
						userAuth: response?.data?.user,
					});
				} else {
					console.log("❌ AuthStore: Login failed with message:", response?.message);
				}

				return response;
			});
		},

		logout: async (): Promise<IApiResponse> => {
			console.log("🚪 AuthStore: Attempting logout");
			return await get().handleRequest(async () => {
				const response = await handleRequest(EHttpType.POST, "/auth/logout");

				// Reset state regardless of response to ensure client is logged out
				console.log("🧹 AuthStore: Resetting all stores");
				get().reset();

				return response;
			});
		},

		sendOTP: async (email: string): Promise<IApiResponse> => {
			console.log("📧 AuthStore: Sending OTP to email:", email);
			const formData = new FormData();
			formData.append("email", email);

			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.POST, "/auth/send-otp", formData);
			});
		},

		verifyOTP: async (email: string, otp: string): Promise<IApiResponse> => {
			console.log("✅ AuthStore: Verifying OTP for email:", email);
			const formData = new FormData();
			formData.append("email", email);
			formData.append("otp", otp);

			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.POST, "/auth/verify-otp", formData);

			});
		},

		resetPassword: async (email: string): Promise<IApiResponse> => {
			console.log("🔄 AuthStore: Resetting password for email:", email);
			const formData = new FormData();
			formData.append("email", email);

			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.POST, "/auth/reset-password", formData);

			});
		},

		forgotPassword: async (email: string, password: string, confirmPassword: string): Promise<IApiResponse> => {
			console.log("🔑 AuthStore: Changing password for email:", email);
			const formData = new FormData();
			formData.append("email", email);
			formData.append("password", password);
			formData.append("confirmPassword", confirmPassword);

			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.PATCH, "/auth/forgot-password", formData);
			});
		},

		changePassword: async (email: string, oldPassword: string, password: string, confirmPassword: string): Promise<IApiResponse> => {
			console.log("🔐 AuthStore: Changing password for email:", email);
			const formData = new FormData();
			formData.append("email", email);
			formData.append("oldPassword", oldPassword);
			formData.append("newPassword", password);
			formData.append("confirmPassword", confirmPassword);

			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.PATCH, "/auth/change-password", formData);
			});
		},

		handleSetUserAuth: (user: IUser): void => {
			console.log("👤 AuthStore: Setting user auth data:", user);
			set({ userAuth: user });
		},

		reset: () => {
			console.log("🧹 AuthStore: Resetting auth store to initial state");
			set({ ...initialState });
			useSystemStore.getState().reset();
			useContactStore.getState().reset();
			useFAQStore.getState().reset();
			useProgramStore.getState().reset();
			useUserStore.getState().reset();
		},
	}),
	{ storageType: EStorageType.COOKIE }
);