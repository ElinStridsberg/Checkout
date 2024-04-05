import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
// import { Layout } from "./pages/Layout";
// import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Confirmation } from "./pages/Confirmation";

export const router = createBrowserRouter([

    // TODO: 
    // 
    // Vilka sidor kommer att behövas
    // {
    //     path: "/",
    //     element: <Layout />,
    //     errorElement: <NotFound />,
    //     children: [
          {
            path: "/",
            element: <Homepage />,
            index: true,
          },
          {
            path: "/confirmation",
            element: <Confirmation />
          }
         
        ]
)

    

