import Layout from "../components/Layout/Layout";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../src/app/store";
import jwt from "jsonwebtoken";
import axios from "axios";
import { SessionProvider } from "next-auth/react";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
function MyApp({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
