import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Car } from "@/data/cars";

type FavoriteState = {
  items: Car[];
};

const initialState: FavoriteState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    addFavorite: (state, action: PayloadAction<Car>) => {
      const exists = state.items.some((car) => car.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((car) => car.id !== action.payload);
    },
    setFavorites: (state, action: PayloadAction<Car[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
