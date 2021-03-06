import Nav from "../components/nav";

import "../styles/globals.css";

import UserProvider from "../context/user";

function MyApp({ Component, pageProps }) {
  return (
    <div className="grid grid-rows-[200px_1fr_100px] h-full">
      <Nav />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}

export default MyApp;
