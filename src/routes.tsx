import { createBrowserRouter } from 'react-router-dom';

import { AppLayoutAdmin } from './pages/_layouts/app-admin';
import { Dashboard_Admin } from './pages/app/admin/dashboard';
import { Dashboard_Admin_Users } from './pages/app/admin/users';
import { AuthLayoutUser } from './pages/_layouts/app-auth';
import { Sign_in } from './pages/app/auth/sign-in';
import { AppLayoutUsers } from './pages/_layouts/app-users';
import { Dashboard_user } from './pages/app/users/dashboard-user';
import { PrivateRoute } from './privateRoute';

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
          { path: '/users_admin', element: <Dashboard_Admin_Users /> }
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
