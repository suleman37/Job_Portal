import AdminDashboardLayout from '../../components/AdminDashboardLayout';

import { useEffect, useState } from "react";
import { Typography, Box, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/candidate/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const profileRes = await axios.get("http://127.0.0.1:8000/api/candidate/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Profile Data:", profileRes.data);
        setProfileData(profileRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please make sure you are logged in.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

  return (
    <AdminDashboardLayout>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>Welcome, Admin!</Typography>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      {profileData && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>User Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{profileData.id}</TableCell>
                <TableCell>{profileData.username}</TableCell>
                <TableCell>{profileData.email}</TableCell>
                <TableCell>{profileData.user_type}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;