import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root';
import Home from './Pages/Home/Home';
import AddBlog from './Pages/AddBlog/AddBlog';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AllBlogs from './Pages/AllBlogs/AllBlogs';
import WishList from './Pages/WishList/WishList';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Provider from './Provider/Provider';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import BlogDetails from './Pages/BlogDetails/BlogDetails';
import UpdatePage from './Pages/UpdatePage/UpdatePage';

import FeaturedBlogs from './Pages/FeaturedBlogs/FeaturedBlogs';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFoundPage></NotFoundPage>,

    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/addBlog",
        element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute> 
      },
      {
        path: "/allBlogs",
        element: <AllBlogs></AllBlogs>
      },
      {
        path: "/wishList",
        element: <PrivateRoute><WishList></WishList></PrivateRoute> 
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><UpdatePage></UpdatePage></PrivateRoute> 
      },
      {
        path: "/featuredBlogs",
        element: <FeaturedBlogs></FeaturedBlogs>
      },
    ]
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>

    </QueryClientProvider>

  </React.StrictMode>,
)
