"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type FavouriteItem = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type FavouritesContextType = {
  favourites: FavouriteItem[];
  toggleFavourite: (item: FavouriteItem) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  // ✅ Load favourites from localStorage when app starts
  useEffect(() => {
    const savedFavs = localStorage.getItem("favourites");
    if (savedFavs) {
      try {
        setFavourites(JSON.parse(savedFavs));
      } catch (error) {
        console.error("Error parsing favourites from localStorage:", error);
      }
    }
  }, []);

  // ✅ Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // ✅ Add/Remove favourite item
  const toggleFavourite = (item: FavouriteItem) => {
    setFavourites((prev) => {
      const isAlreadyFav = prev.some((f) => f.id === item.id);
      return isAlreadyFav ? prev.filter((f) => f.id !== item.id) : [...prev, item];
    });
  };

  // ✅ Remove from favourites
  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((f) => f.id !== id));
  };

  // ✅ Check if an item is favourite
  const isFavourite = (id: string) => favourites.some((f) => f.id === id);

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) throw new Error("useFavourites must be used within FavouritesProvider");
  return context;
};
