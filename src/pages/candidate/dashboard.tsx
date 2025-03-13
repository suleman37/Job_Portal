import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Card, CardContent, Grid, Alert } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

const CandidateDashboard = () => {
  const [profile, setProfile] = useState<any>({
    username: "DemoCandidate",
    email: "demo@candidate.com",
    applied_jobs: [1, 2]
  });
  const [jobs, setJobs] = useState<any[]>([
    {
      id: 1,
      title: "Frontend Developer",
      company_name: "Tech Corp",
      location: "Remote",
      salary: "$80,000"
    },
    {
      id: 2,
      title: "Backend Developer",
      company_name: "Innovate Ltd",
      location: "New York, NY",
      salary: "$90,000"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company_name: "Web Solutions",
      location: "San Francisco, CA",
      salary: "$100,000"
    }
  ]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Fetch profile and jobs on component load
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
        setProfile(profileRes.data);

        const jobsRes = await axios.get("http://127.0.0.1:8000/api/jobs/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(jobsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please make sure you are logged in.");
      }
    };

    fetchData();
  }, [router]);

  const handleApplyJob = async (jobId: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://127.0.0.1:8000/api/jobs/apply/${jobId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Successfully applied to the job!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply to the job.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/candidate/login");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Welcome, {profile?.username || "Candidate"}!</Typography>
        <Button color="error" variant="contained" onClick={handleLogout}>Logout</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Profile Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Your Profile</Typography>
          <Typography>Email: {profile?.email}</Typography>
          <Typography>Applied Jobs: {profile?.applied_jobs?.length || 0}</Typography>
        </CardContent>
      </Card>

      {/* Jobs Section */}
      <Typography variant="h5" sx={{ mb: 2 }}>Available Jobs</Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography>Company: {job.company_name}</Typography>
                <Typography>Location: {job.location}</Typography>
                <Typography>Salary: {job.salary}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleApplyJob(job.id)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* AI Practice Interview Section */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ mb: 2 }}>AI Practice Interviews</Typography>
        <Typography>Prepare for your interviews using our AI-driven practice module.</Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => router.push("/candidate/ai-interview")}>
          Start AI Interview
        </Button>
      </Box>

      {/* Chatbot Support */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ mb: 2 }}>Need Help? Talk to AI Chatbot</Typography>
        <Button variant="outlined" color="info" onClick={() => router.push("/candidate/chatbot")}>
          Open Chatbot
        </Button>
      </Box>
    </Container>
  );
};

export default CandidateDashboard;
