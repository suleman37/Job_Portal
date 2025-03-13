import { useEffect, useState } from "react";
import { Container, Typography, Button, Card, CardContent, Grid, Alert, Box } from "@mui/material";
import { useRouter } from "next/router";
import API from "../../services/api"; 

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  created_at: string;
  is_active: boolean;
  applicants: string[];
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
    username: "DemoRecruiter"
  });
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Software Engineer",
      description: "Develop and maintain web applications.",
      location: "New York, NY",
      salary: "100000.00",
      created_at: "2023-01-01T00:00:00Z",
      is_active: true,
      applicants: ["user1", "user2"]
    },
    {
      id: 2,
      title: "Product Manager",
      description: "Lead product development teams.",
      location: "San Francisco, CA",
      salary: "120000.00",
      created_at: "2023-02-15T00:00:00Z",
      is_active: true,
      applicants: ["user3"]
    }
  ]);
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: 1,
      candidate: "John Doe",
      job: "Software Engineer",
      scheduled_at: "2023-03-01T10:00:00Z",
      status: "Scheduled"
    },
    {
      id: 2,
      candidate: "Jane Smith",
      job: "Product Manager",
      scheduled_at: "2023-03-02T14:00:00Z",
      status: "Completed"
    }
  ]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const profileRes = await API.get("recruiter/profile/");
      console.log("Fetching recruiter profile data..." , profileRes);

      const jobsRes = await API.get("recruiter/jobs/");
      console.log("Fetching jobs data..." , profileRes);

      const interviewsRes = await API.get("recruiter/interviews/");
      console.log("Fetching interviews data..." , interviewsRes);

      setProfile(profileRes.data);
      setJobs(jobsRes.data);
      setInterviews(interviewsRes.data);
    } catch (err) {
      setError("Failed to load recruiter data. Please login again.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {profile?.username}!
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Your Posted Jobs
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => router.push("/recruiter/post-job")}>
          Post New Job
        </Button>
      </Box>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{job.title}</Typography>
                <Typography variant="body2" color="textSecondary" paragraph>{job.description}</Typography>
                <Typography variant="body2">Location: {job.location}</Typography>
                <Typography variant="body2">Salary: ${parseFloat(job.salary).toFixed(2)}</Typography>
                <Typography variant="caption" display="block">Posted on: {new Date(job.created_at).toLocaleDateString()}</Typography>
                <Typography variant="caption" display="block">Active: {job.is_active ? "Yes" : "No"}</Typography>
                <Typography variant="caption" display="block">Applicants: {job.applicants.join(", ")}</Typography>
              </CardContent>
            </Card>
          </Grid>
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