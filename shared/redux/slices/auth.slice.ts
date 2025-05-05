import { Statuses } from "@/@types/enums";
import { setCookie, deleteCookie } from "cookies-next";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
}

export interface User {
    id: String;
    name: string;
    email: string | null;
    role: Roles;
}
export enum Roles {
    ADMIN,
    MANAGER,
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        deleteUser(state) {
            state.user = null;
        },
    },
});
export const { setUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
