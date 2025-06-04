import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import AboutUsPage from "../Pages/AboutUsPage";
import GalleryPage from "../Pages/GalleryPage";
import DesignDetailsPage from "../Pages/DesignDetailsPage";
import { LogInAndSignUp } from "../Pages/LogInAndSignUp";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import { AdminPage } from "../Pages/AdminPage";
import AddProduct from "../Pages/AdminPages/AddProduct";
import ViewProduct from "../Pages/AdminPages/ViewProduct";
import SingleProductDetails from "../Pages/SingleProductDetails";
import Carts from "../Pages/Carts";
import Order from "../Pages/Order";
import Contact from "../Pages/Contact";
import FeedbackPage from "../Pages/FeedbackPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",  // no need for leading slash
        element: <AboutUsPage />
      },
      {
        path: "gallery", // changed from /GalleryPage to gallery
        element: <GalleryPage/>
      },
      {
        path: "details", // changed from /details to details
        element: <DesignDetailsPage />
      },
      {
        path:"login-signup",
        element:<LogInAndSignUp></LogInAndSignUp>
      },
      {
        path:"login",
        element:<LoginPage></LoginPage>
      },
      {
        path:"signup",
        element:<SignupPage></SignupPage>
      },
      {
        path:"admin",
        element:<AdminPage></AdminPage>
      },
      {
        path:"product/:id/:type",
        element:<AddProduct></AddProduct>
      },
      {
        path:"view_product",
        element:<ViewProduct></ViewProduct>
      },
      {
        path:"single_product_details",
        element:<SingleProductDetails></SingleProductDetails>
      },
      {
        path:"cart",
        element:<Carts></Carts>
      },
      {
        path: "order/:id/:type", // Both id and type are required parameters
        element: <Order />
      } ,
      {
        path: "contact", // Both id and type are required parameters
        element: <Contact/>
      },
      {
        path:'feedback',
        element:<FeedbackPage></FeedbackPage>
      }
    ]
  }
]);

  export default router;
