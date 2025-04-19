import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type SearchType = {
	searchValue: string
}
const initialState: SearchType = {
	searchValue: '',
}

const searchParamsSlice = createSlice({
    name: "Search",
    initialState,
    reducers: {
        setSearch: (state, { payload }: PayloadAction<string>) => {         
            state.searchValue = payload.trim().toLowerCase();
        },
    },
});
export const { setSearch } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
