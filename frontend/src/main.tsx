import React from "react";
import Root from "./routes/root.tsx";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Messages from "./routes/Messages.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/messages",
        element: (
          <Messages />
        ),
      },
      {
        path: "/",
        element: <App />,
      },
    ],
  },
  {},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
