import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../Reducers/favoriteSlice";

export const useFavoritesAction = () => {
  const dispatch = useDispatch();

  const addToReduxFavorites = useCallback(
    (task) => {
      dispatch(addToFavorites(task));
    },
    [dispatch]
  );

  return { addToReduxFavorites };
};
