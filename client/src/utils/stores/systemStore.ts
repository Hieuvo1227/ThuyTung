import { IBaseStore, createStore } from "../../lib/initialStore";
import { ETheme } from "../types/enum";

export interface ISystemStore extends IBaseStore {
	theme: ETheme;

	handleSetTheme: (theme: ETheme) => void;
}

const storeName = "system";
const initialState = {
	theme: ETheme.LIGHT,
};

export const useSystemStore = createStore<ISystemStore>(
	storeName,
	initialState,
	(set) => ({
		handleSetTheme: (theme: ETheme) => {
			set({ theme });
		},
	})
);
