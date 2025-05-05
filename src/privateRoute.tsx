import { Navigate, Outlet } from 'react-router-dom';

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem('token');  // Obtém o token do localStorage
  const role_user = localStorage.getItem('role'); // Obtém o role_user do localStorage
  return !!token && !!role_user; // Retorna true se ambos existirem
};

export function PrivateRoute() {
  const token = localStorage.getItem('token');  // Obtém o token armazenado no localStorage
  const role_user = localStorage.getItem('role'); // Obtém o role_user armazenado no localStorage

  // Se não estiver autenticado, redireciona para a tela de login
  if (!isAuthenticated()) {
    console.log('Usuário não autenticado, redirecionando para login.');
    return <Navigate to="/sign-in" replace />;
  }

  // Lógica para redirecionar baseado no role
  if (role_user === 'admin') {
    console.log('Usuário admin, permitindo acesso à rota admin.');
    return <Outlet />;  // Permite acesso às rotas do admin
  } else if (role_user === 'user') {
    console.log('Usuário normal, permitindo acesso à rota do usuário.');
    return <Outlet />;  // Permite acesso às rotas do usuário normal
  } else {
    console.log('Perfil de usuário desconhecido, redirecionando para login.');
    return <Navigate to="/sign-in" replace />;
  }
}
