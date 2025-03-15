import { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, CircularProgress, Alert, Box } from '@mui/material';
import AdminDashboardLayout from '../../components/AdminDashboardLayout';
import UserTable from '../../components/UserTable';

interface User {
  id: number;
  username: string;
  email: string;
  user_type: 'admin' | 'recruiter' | 'candidate';
}

interface AdminStats {
  total_users: number;
  total_recruiters: number;
  total_candidates: number;
  total_jobs: number;
  total_interviews: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'admin1', email: 'admin1@example.com', user_type: 'admin' },
    { id: 2, username: 'recruiter1', email: 'recruiter1@example.com', user_type: 'recruiter' },
    { id: 3, username: 'candidate1', email: 'candidate1@example.com', user_type: 'candidate' }
  ]);
  const [stats, setStats] = useState<AdminStats>({
    total_users: 3,
    total_recruiters: 1,
    total_candidates: 1,
    total_jobs: 5,
    total_interviews: 2,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Delete user handler
  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setUsers(users.filter((user) => user.id !== userId));  // Update UI
      } catch (err) {
        console.error(err);
        alert('Failed to delete user.');
      }
    }
  };

  // ✅ Loading screen
  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  return (
    <AdminDashboardLayout>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>Welcome, Admin!</Typography>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" align="center">Total Users</Typography>
              <Typography variant="h5" align="center">{stats.total_users}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" align="center">Total Recruiters</Typography>
              <Typography variant="h5" align="center">{stats.total_recruiters}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" align="center">Total Candidates</Typography>
              <Typography variant="h5" align="center">{stats.total_candidates}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Table */}
      <UserTable users={users} handleDelete={handleDelete} />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;