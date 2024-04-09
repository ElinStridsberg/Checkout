import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Confirmation } from "./pages/Confirmation";
import Cart from "./components/Cart";


export const router = createBrowserRouter([

          {
            path: "/",
            element: <Homepage />,
            index: true,
          },
          {
            path: "/confirmation",
            element: <Confirmation />
          },
          {
            path: "/cart",
            element: <Cart />
            
          }
         
        ]
)

    

