import '../styles/globals.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createContext } from "react";
import { getStrapiMedia } from "../lib/media";
import { fetchAPI } from "../lib/api";
import Head from "next/head";
import App from "next/app";

const theme = extendTheme({
  fonts: {
    body: process.env.NEXT_PUBLIC_FONT_FAMILY,
    heading: process.env.NEXT_PUBLIC_FONT_FAMILY,
    mono: process.env.NEXT_PUBLIC_FONT_FAMILY,
  },

  styles: {
    global: {
      fontFamily: process.env.NEXT_PUBLIC_FONT_FAMILY,
      ".markdown": {
        a: {
          textDecoration: "underline",
        },
        h1: {
          fontSize: "4xl",
          fontWeight: "bold",
          padding: "12px 0 0px 0",
        },
        h2: {
          fontSize: "2xl",
          fontWeight: "bold",
          padding: "12px 0 2px 0",
        },
        h3: {
          fontSize: "xl",
          fontWeight: "bold",
          padding: "12px 0 2px 0",
        },
        h4: {
          fontSize: "md",
          fontWeight: "semibold",
          padding: "0 0 14px 0",
        },
        p: {
          margin: "0px 0 12px 0",
          // padding: "0px 0 4px 0",
          fontSize:"20px"
        },
        ul: {
          padding: "0px 0 8px 28px"
        },
        ol: {
          padding: "0px 0 8px 28px"
        },

      },
      ".box": {
        borderRadius: "0px",
        border: "2px solid #333",
        padding: "10px",
      },
      hr:{
        margin:"22px 0"
      }
    },
  },
});

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps }) {
  const { global } = pageProps;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
      </Head>
      <GlobalContext.Provider value={global}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </GlobalContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  //const global = await fetchAPI("/global");
  // Pass the data to our page via props
  //const links = await fetchAPI("/links");

  const [articles, global,links,emailform ,homepage] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/global"),
    fetchAPI("/links"),
    fetchAPI("/emailform"),
    fetchAPI("/homepage"),
  ]);

  global.groupedLinks = links.reduce((hash, obj) => ({...hash, [obj["group"]]:( hash[obj["group"]] || [] ).concat(obj)}), {});
  global.emailform = emailform;
  global.articles = articles;
  global.homepage = homepage;

  return { ...appProps, pageProps: { global} };
};

export default MyApp;
