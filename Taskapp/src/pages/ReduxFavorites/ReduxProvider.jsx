import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store/store";
import ReduxFavorites from "./FavoritesRedux";

const ReduxProvider = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ReduxFavorites />
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
