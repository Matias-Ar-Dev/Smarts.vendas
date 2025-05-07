import { createBrowserRouter } from 'react-router-dom';

import { AppLayoutAdmin } from './pages/_layouts/app-admin';
import { Dashboard_Admin } from './pages/app/admin/dashboard';
import { Dashboard_Admin_Users } from './pages/app/admin/users';
import { AuthLayoutUser } from './pages/_layouts/app-auth';
import { Sign_in } from './pages/app/auth/sign-in';
import { AppLayoutUsers } from './pages/_layouts/app-users';
import { Dashboard_user } from './pages/app/users/dashboard-user';
import { PrivateRoute } from './privateRoute';

import UploadForm from './pages/app/admin/adminDoc';
import EditUploadForm from './pages/app/admin/add';
import { Dashboard_admin_doc } from './pages/app/admin/doc_admin';


 // Importa aqui

export const router = createBrowserRouter([

  // ROTA LIVRE
  {
    path: '/sign-in',
    element: <AuthLayoutUser />,
    children: [
      { path: '/sign-in', element: <Sign_in /> }
    ]
  },

  // ROTAS PROTEGIDAS
  {
    element: <PrivateRoute />, //  Protegendo tudo abaixo
    children: [

      {
        path: '/',
        element: <AppLayoutAdmin />,
        children: [
          { path: '/', element: <Dashboard_Admin /> },
          { path: '/users_admin', element: <Dashboard_Admin_Users /> },
          {path:'/edit_doc', element:<UploadForm/>},
          {path:'/e', element:<EditUploadForm/>},
          {path:'/doc_admin', element:<Dashboard_admin_doc/>}
        ]
      },

      {
        path: '/users_func',
        element: <AppLayoutUsers />,
        children: [
          { path: '/users_func', element: <Dashboard_user /> }
        ]
      }

    ]
  }

]);
