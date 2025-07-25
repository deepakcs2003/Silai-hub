import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React, { Suspense, lazy } from "react";
import App from "../App";
const Home = lazy(() => import("../Pages/Home"));
const AboutUsPage = lazy(() => import("../Pages/AboutUsPage"));
const GalleryPage = lazy(() => import("../Pages/GalleryPage"));
const DesignDetailsPage = lazy(() => import("../Pages/DesignDetailsPage"));
const LogInAndSignUp = lazy(() => import("../Pages/LogInAndSignUp"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const SignupPage = lazy(() => import("../Pages/SignupPage"));
const AdminPage = lazy(() => import("../Pages/AdminPage"));
const AddProduct = lazy(() => import("../Pages/AdminPages/AddProduct"));
const ViewProduct = lazy(() => import("../Pages/AdminPages/ViewProduct"));
const SingleProductDetails = lazy(() => import("../Pages/SingleProductDetails"));
const Carts = lazy(() => import("../Pages/Carts"));
const Order = lazy(() => import("../Pages/Order"));
const Contact = lazy(() => import("../Pages/Contact"));
const FeedbackPage = lazy(() => import("../Pages/FeedbackPage"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutUsPage />
          </Suspense>
        )
      },
      {
        path: "gallery",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GalleryPage />
          </Suspense>
        )
      },
      {
        path: "details",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DesignDetailsPage />
          </Suspense>
        )
      },
      {
        path: "login-signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LogInAndSignUp />
          </Suspense>
        )
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        )
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignupPage />
          </Suspense>
        )
      },
      {
        path: "admin",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPage />
          </Suspense>
        )
      },
      {
        path: "product/:id/:type",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddProduct />
          </Suspense>
        )
      },
      {
        path: "view_product",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ViewProduct />
          </Suspense>
        )
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SingleProductDetails />
          </Suspense>
        )
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Carts />
          </Suspense>
        )
      },
      {
        path: "order/:id/:type",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Order />
          </Suspense>
        )
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        )
      },
      {
        path: "feedback",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FeedbackPage />
          </Suspense>
        )
      }
    ]
  }
]);

  export default router;
