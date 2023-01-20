import React, { useState } from "react";
import { AuthContextProvider } from "./lib/context/AuthContext/AuthContextProvider";
// import { PublicRoute } from "./routes";

import { Routes } from "./routes";

import { Navbar, BurgerMenu } from "./components";
import { AnimatePresence } from "framer-motion";
import { LayoutProvider } from "./lib/hooks/useLayout";

function App() {
  const [burgerMenu, setBurgerMenu] = useState(false);

  return (
    <AuthContextProvider>
      <LayoutProvider>
        <Navbar burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
        <AnimatePresence exitBeforeEnter>
          {burgerMenu && <BurgerMenu setBurgerMenu={setBurgerMenu} />}
        </AnimatePresence>

        <AnimatePresence exitBeforeEnter>
          <Routes />
        </AnimatePresence>

      </LayoutProvider>
    </AuthContextProvider>
  );
}

export default App;
