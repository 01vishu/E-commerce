import Layout from "../components/Layout/Layout";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../src/app/store";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
const theme = createTheme({
  palette: {
    primary: {
      main: "#8d735f",
    },
  },
});

function MyApp({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
