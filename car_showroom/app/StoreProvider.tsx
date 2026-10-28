"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { makeStore } from "@/lib/store";
import { setFavorites } from "@/lib/features/favorites/favoriteSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");

      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);

        if (Array.isArray(favorites)) {
          store.dispatch(setFavorites(favorites));
        }
      }
    } catch (error) {
      console.error("Unable to load saved favorites:", error);
      localStorage.removeItem("favorites");
    }
  }, [store]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();

        localStorage.setItem(
          "favorites",
          JSON.stringify(state.favorites.items),
        );
      } catch (error) {
        console.error("Unable to save favorites:", error);
      }
    });

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
