import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Verifique o token
  const role_user = localStorage.getItem('role');   // Verifique o role do usuário
  console.log('Token:', token);  // Verificando o token
  console.log('Role:', role_user);    // Verificando o role
  return !!token && !!role_user; // Certifique-se de que ambos existam
};

export function PrivateRoute() {
  const role_user = localStorage.getItem('role'); // Pega o role no localStorage

  if (!isAuthenticated()) {
    console.log('Usuário não autenticado, redirecionando para login.');
    return <Navigate to="/sign-in" replace />;
  }

  // Lógica para redirecionar baseado no role
  if (role_user === 'admin') {
    console.log('Usuário admin, permitindo acesso à rota admin.');
    return <Outlet />; // Permite acesso às rotas do admin
  } else if (role_user === 'user') {
    console.log('Usuário normal, permitindo acesso à rota do usuário.');
    return <Outlet />; // Permite acesso às rotas do usuário normal
  } else {
    console.log('Perfil de usuário desconhecido, redirecionando para login.');
    return <Navigate to="/sign-in" replace />;
  }
}
