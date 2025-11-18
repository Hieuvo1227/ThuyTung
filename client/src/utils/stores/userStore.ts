import { EHttpType, handleRequest, IApiResponse } from "../../lib/axiosInstance";
import { IBaseStore, createStore } from "../../lib/initialStore";
import { EUserStatus } from "../types/enum";

interface IUserDataResponse {
	user?: IUser;
	users?: IUser[];
}

export interface IUserStore extends IBaseStore {
	usersTable: IUser[];

	getAllUsers: () => Promise<IApiResponse<IUserDataResponse>>;
	getUser: (
		userId: string
	) => Promise<IApiResponse<IUserDataResponse>>;
	createUser: (
		email: string,
		password: string,
		name: string,
		phone: string,
		status: EUserStatus
	) => Promise<IApiResponse<IUserDataResponse>>;
	updateUser: (
		userId: string,
		email: string,
		password: string,
		name: string,
		phone: string,
		status: EUserStatus
	) => Promise<IApiResponse<IUserDataResponse>>;
	deleteUser: (
		userId: string
	) => Promise<IApiResponse<IUserDataResponse>>;
}

const storeName = "user";
const initialState = {
	usersTable: [],
};

export const useUserStore = createStore<IUserStore>(
	storeName,
	initialState,
	(set, get) => ({
		getAllUsers: async (): Promise<IApiResponse<IUserDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/users`);
			});
		},

		getUser: async (userId: string): Promise<IApiResponse<IUserDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/users/${userId}`);
			});
		},

		createUser: async (
			email: string,
			password: string,
			name: string,
			phone: string,
			status: EUserStatus
		): Promise<IApiResponse<IUserDataResponse>> => {
			return await get().handleRequest(async () => {
				const formData = new FormData();
				formData.append("email", email);
				formData.append("password", password);
				formData.append("name", name);
				formData.append("phone", phone);
				formData.append("status", status);

				return await handleRequest(EHttpType.POST, `/users`, formData);
			});
		},

		updateUser: async (
			userId: string,
			email: string,
			password: string,
			name: string,
			phone: string,
			status: EUserStatus
		): Promise<IApiResponse<IUserDataResponse>> => {
			return await get().handleRequest(async () => {
				const formData = new FormData();
				formData.append("email", email);
				formData.append("password", password);
				formData.append("name", name);
				formData.append("phone", phone);
				formData.append("status", status);

				return await handleRequest(EHttpType.PATCH, `/users/${userId}`, formData);
			});
		},

		deleteUser: async (userId: string): Promise<IApiResponse<IUserDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.DELETE, `/users/${userId}`);
			});
		},
	})
);