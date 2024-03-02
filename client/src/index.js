/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";
import postsReducer from "./reducers/postsReducer";

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: { posts: postsReducer },
});

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="300549585207-6hmb0epksgmfr7l2qe1g8mq40bi8vsmh.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    ;
  </Provider>,
  document.getElementById("root")
);
