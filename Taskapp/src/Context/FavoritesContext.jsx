import React, { createContext, useContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("contextFavorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("contextFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (task) => {
    setFavorites((prev) => {
      if (!prev.find((t) => t.id === task.id)) {
        return [...prev, task];
      }
      return prev;
    });
  };

  const removeFromFavorites = (taskId) => {
    setFavorites((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
