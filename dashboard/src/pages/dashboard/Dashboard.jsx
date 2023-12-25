import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div>hola admin, {user.email}</div>

    </DashboardLayout>
  )
};

export default Dashboard;