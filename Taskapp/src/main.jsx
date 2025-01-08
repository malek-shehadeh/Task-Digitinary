import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import "./index.css";
import App from "./App";
import { TaskProvider } from "./Context/TaskProvider";
import { FavoritesProvider } from "./Context/FavoritesContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TaskProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </TaskProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
