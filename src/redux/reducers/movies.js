import { createSlice } from "@reduxjs/toolkit";
const moviesSlice = createSlice({
    name: "movies",
    initialState: {movies: {list:[], filter: ""}},
    reducers: {
        setMovies: (state, action) => {
            state.movies.list = action.payload
        },
        setFilter: (state, action) => {
            state.movies.filter = action.payload;
        }
    }
});

export const { setMovies, setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
