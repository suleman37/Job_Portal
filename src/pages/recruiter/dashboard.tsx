import { useEffect, useState } from "react";
import { Container, Typography, Button, Card, CardContent, Grid, Alert, Box, AppBar, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  created_at: string;
  is_active: boolean;
  applicants: string[];
  email: string; // Added email field to Job interface
}

interface Interview {
  id: number;
  candidate: string;
  job: string;
  scheduled_at: string;
  status: string;
}

export default function RecruiterDashboard() {
  const [profile, setProfile] = useState<any>({
    username: "DemoRecruiter",
    email: "demo@recruiter.com" // Assuming this is the recruiter's email
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || '{"email":"","password":""}');
    setProfile({ username: formData.email.split('@')[0], email: formData.email });
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/jobs/");
      setJobs(response.data);
    } catch (err) {
      setError("Failed to load recruiter data from API.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("formData");
    router.push("/recruiter/login");
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Recruiter Dashboard
          </Typography>
          <Button color="inherit" onClick={() => router.push("/recruiter/post-job")}>
            Post New Job
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Welcome, {profile?.username}!
      </Typography>
     

      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Your Posted Jobs
        </Typography>
      </Box>

      <Grid container spacing={3} >
        {jobs.map((job) => (
          job.email === profile.email && ( 
            <Grid item xs={12} md={6} key={job.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{job.title}</Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>{job.description}</Typography>
                  <Typography variant="body2">Location: {job.location}</Typography>
                  <Typography variant="body2">Email: {job.email}</Typography>
                  <Typography variant="body2">Salary: ${parseFloat(job.salary).toFixed(2)}</Typography>
                  <Typography variant="caption" display="block">Posted on: {new Date(job.created_at).toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Scheduled Interviews
        </Typography>
        {interviews.length === 0 && <Typography>No interviews scheduled.</Typography>}
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {interviews.map((interview) => (
          <Grid item xs={12} key={interview.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="body2">Candidate: {interview.candidate}</Typography>
                <Typography variant="body2">Job: {interview.job}</Typography>
                <Typography variant="body2">Scheduled At: {new Date(interview.scheduled_at).toLocaleString()}</Typography>
                <Typography variant="body2">Status: {interview.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}