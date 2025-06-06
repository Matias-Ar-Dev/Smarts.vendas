import { createBrowserRouter } from 'react-router-dom';

// Layouts
import { AppLayoutAdmin } from './pages/_layouts/app-admin';
import { AppLayoutUsers } from './pages/_layouts/app-users';
import { AuthLayoutUser } from './pages/_layouts/app-auth';

// Páginas Admin
import { Dashboard_Admin } from './pages/app/admin/dashboard';
import { Dashboard_Admin_Users } from './pages/app/admin/users';
import { Dashboard_admin_doc } from './pages/app/admin/doc_admin';
import UploadForm from './pages/app/admin/adminDoc';

// Páginas Usuário
import { Dashboard_user } from './pages/app/users/dashboard-user';

// Autenticação
import { Sign_in } from './pages/app/auth/sign-in';
import { PrivateRoute } from './privateRoute';

// Página de erro
import { NotFound } from './pages/404';
import { EditProfile } from './pages/app/Profile_User/profile_user';
import Document_List_User from './pages/app/users/document_user/document_user';





export const router = createBrowserRouter([
  // ROTA PÚBLICA: Login
  {
    path: '/sign-in',
    element: <AuthLayoutUser />,
    children: [
      { path: '/sign-in', element: <Sign_in /> },
    ],
  },

  // ROTAS PROTEGIDAS
  {
    element: <PrivateRoute />,
    children: [
      // ROTAS ADMIN
      {
        path: '/',
        element: <AppLayoutAdmin />,
        children: [
          { path: '/', element: <Dashboard_Admin /> },
          { path: '/users_admin', element: <Dashboard_Admin_Users /> },
          { path: '/edit_doc', element: <UploadForm /> },
          { path: '/profile-user', element: <EditProfile/> },
          { path: '/doc_admin', element: <Dashboard_admin_doc /> },
        ],
      },

      // ROTAS FUNCIONÁRIO
      {
        path: '/users_func',
        element: <AppLayoutUsers />,
        children: [
          { path: '/users_func', element: <Dashboard_user /> },
          {path:'/users_func/doc_user', element: <Document_List_User/>},
        ],
      },
    ],
  },

  // ✅ ROTA CORINGA PARA 404
  {
    path: '*',
    element: <NotFound />,
  },
]);
