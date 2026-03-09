import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./components/shared/Spinner";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
