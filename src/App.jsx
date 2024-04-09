import React from "react";
import ReactDOM from "react-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MasterPage} from "./Pages/MasterPage";
import {AddPage} from "./Pages/AddPage";
import {DetailPage} from "./Pages/DetailPage";

import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterPage />
  },
  {
    path: "/add",
    element: <AddPage />
  },
  {
    path: "/detail/:id", // Define the route for the detail page with a parameter for the cow ID
    element: <DetailPage />
  },
]);

const App = () => (
  <RouterProvider router={router}/>
);
ReactDOM.render(<App />, document.getElementById("app"));
