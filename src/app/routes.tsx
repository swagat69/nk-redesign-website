import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./components/site/RootLayout";
import Home from "./pages/Home";
import Capabilities from "./pages/Capabilities";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "capabilities", Component: Capabilities },
      { path: "portfolio", Component: Portfolio },
      { path: "products", element: <Navigate to="/portfolio" replace /> },
      { path: "about", Component: About },
      { path: "blog", Component: Blog },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
], { basename });
