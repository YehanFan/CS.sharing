import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ConfigProvider as AvatarProvider } from "react-avatar";
import { getInitials } from "./utils/stringUtils";
import { avatarColors } from "./constants/avatarColors";

import Modal from "react-modal";

const container = document.getElementById("root");
const root = createRoot(container);
Modal.setAppElement("#root");

root.render(
  <>
    <AvatarProvider colors={avatarColors} initials={getInitials}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </AvatarProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
