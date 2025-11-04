import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filter",
  initialState: {
      priceFrom: "",
      priceTo: "",
      isDiscounted: false,
      sortBy: "by default",
    },
    reducers: {
      setPriceFrom: (state, action) => { 
        state.priceFrom = action.payload;
      },
      setPriceTo: (state, action) => {
        state.priceTo = action.payload;
      },
      setIsDiscounted: (state, action) => {
        state.isDiscounted = action.payload;
      },
      setSortBy: (state, action) => {
        state.sortBy = action.payload;
      },
      resetFilters: (state) => {
        state.priceFrom = "";
        state.priceTo = "";
        state.isDiscounted = false;
        state.sortBy = "by default";
      }
  
  },

});
export const { setPriceFrom, setPriceTo, setSortBy, resetFilters, setIsDiscounted } = filtersSlice.actions;
export default filtersSlice.reducer;
