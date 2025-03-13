import { useEffect, useState } from "react";
import { Container, Typography, Button, Card, CardContent, Grid, Alert } from "@mui/material";
import { useRouter } from "next/router";
import API from "../../services/api"; 
interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  created_at: string;
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
      salary: "$100,000",
      created_at: "2023-01-01T00:00:00Z"
    },
    {
      id: 2,
      title: "Product Manager",
      description: "Lead product development teams.",
      location: "San Francisco, CA",
      salary: "$120,000",
      created_at: "2023-02-15T00:00:00Z"
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
    // fetchDashboardData(); // Commented out to use demo data
  }, []);

  const fetchDashboardData = async () => {
    try {
      const profileRes = await API.get("recruiter/profile/");
      const jobsRes = await API.get("recruiter/jobs/");
      const interviewsRes = await API.get("recruiter/interviews/");

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

      <Typography variant="h6" gutterBottom>
        Your Posted Jobs
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => router.push("/recruiter/post-job")}>
        Post New Job
      </Button>

      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography>{job.description}</Typography>
                <Typography>Location: {job.location}</Typography>
                <Typography>Salary: {job.salary}</Typography>
                <Typography variant="caption">Posted on: {new Date(job.created_at).toLocaleDateString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Scheduled Interviews
      </Typography>
      {interviews.length === 0 && <Typography>No interviews scheduled.</Typography>}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {interviews.map((interview) => (
          <Grid item xs={12} key={interview.id}>
            <Card>
              <CardContent>
                <Typography>Candidate: {interview.candidate}</Typography>
                <Typography>Job: {interview.job}</Typography>
                <Typography>Scheduled At: {new Date(interview.scheduled_at).toLocaleString()}</Typography>
                <Typography>Status: {interview.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}