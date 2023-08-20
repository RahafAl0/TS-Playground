import React from 'react'
import Root from './routes/root.tsx';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import App from './App.tsx'
import './index.css'
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element : <Root/>,
    children: [
      {
        path: "/messages",
        element: <div> 
          <h1>Messges!</h1>
        </div>,
      },
      {
        path: "/",
        element : <App/>
      }

    ]
  }
  ,{
   
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
