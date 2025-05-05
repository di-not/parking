import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type SearchType = {
    isAuthenticated: boolean;
    role: Roles | null;
};
export enum Roles {
    ADMIN = 'admin',
    MANAGER = 'manager',
}
const initialState: SearchType = {
    isAuthenticated: false,
    role: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, { payload }: PayloadAction<boolean>) => {
            state.isAuthenticated = payload;
        },
        setRole: (state, { payload }: PayloadAction<Roles | null>) => {
            state.role = payload;
        },
    },
});
export const { setAuth,setRole } = authSlice.actions;
export default authSlice.reducer;
