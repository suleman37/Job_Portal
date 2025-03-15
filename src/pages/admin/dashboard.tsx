import AdminDashboardLayout from '../../components/AdminDashboardLayout';
import UserTable from '../../components/UserTable';

import { useEffect, useState } from "react";
import { Typography, Box, Card, CardContent, Grid, Alert } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

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
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total_users: 0,
    total_recruiters: 0,
    total_candidates: 0,
    total_jobs: 0,
    total_interviews: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/candidate/login");
      return;
    }

    const fetchData = async () => {
      try {
        const profileRes = await axios.get("http://127.0.0.1:8000/api/candidate/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Profile Data:", profileRes.data);

        const usersRes = await axios.get("http://127.0.0.1:8000/api/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Users Data:", usersRes.data);
        setUsers(usersRes.data);

        const statsRes = await axios.get("http://127.0.0.1:8000/api/admin/stats/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Stats Data:", statsRes.data);
        setStats(statsRes.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please make sure you are logged in.");
      }
    };

    fetchData();
  }, [router]);

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete user.');
      }
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

  return (
    <AdminDashboardLayout>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>Welcome, Admin!</Typography>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
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
      <UserTable users={users} handleDelete={handleDelete} />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;