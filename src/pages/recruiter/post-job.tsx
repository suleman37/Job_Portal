import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Alert,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import API from "../../services/api";

export default function PostJobPage() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    created_at: new Date().toISOString().slice(0, 16),
    is_active: true,
    applicants: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setJobDetails({
      ...jobDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const applicantsArray = jobDetails.applicants.split(",").map(id => id.trim());
      const jobData = { ...jobDetails, applicants: applicantsArray };

      await API.post("recruiter/jobs/", jobData);
      setSuccess("Job posted successfully!");
      setTimeout(() => router.push("/recruiter/dashboard"), 2000);
    } catch (err) {
      setError("Failed to post job. Please try again.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Post a New Job
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={jobDetails.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={jobDetails.location}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Description"
                  name="description"
                  value={jobDetails.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Salary"
                  name="salary"
                  value={jobDetails.salary}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Created At"
                  name="created_at"
                  type="datetime-local"
                  value={jobDetails.created_at}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={jobDetails.is_active}
                      onChange={handleChange}
                      name="is_active"
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Applicants"
                  name="applicants"
                  value={jobDetails.applicants}
                  onChange={handleChange}
                  placeholder="Enter applicant IDs separated by commas"
                />
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="right">
                  <Button variant="contained" color="primary" type="submit">
                    Post Job
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}