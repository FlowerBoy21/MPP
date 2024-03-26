import React from "react";
import ReactDOM from "react-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MasterPage} from "./Pages/MasterPage";
import {AddPage} from "./Pages/AddPage";

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
]);

const App = () => (
  <RouterProvider router={router}/>
);
ReactDOM.render(<App />, document.getElementById("app"));
