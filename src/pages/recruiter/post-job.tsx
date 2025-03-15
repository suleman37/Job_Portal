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
import axios from "axios";

export default function PostJobPage() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    is_active: true,
    applicants: "", // Comma-separated user IDs
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setJobDetails({
      ...jobDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Convert applicants to an array of numbers
      const applicantsArray = jobDetails.applicants
        ? jobDetails.applicants.split(",").map(id => parseInt(id.trim(), 10))
        : [];

      // Convert salary to a float
      const finalData = {
        ...jobDetails,
        salary: parseFloat(jobDetails.salary), // Convert salary to number
        applicants: applicantsArray, // Convert applicants to an array
      };

      // Send data to API
      await axios.post("http://127.0.0.1:8000/api/jobs/", finalData);
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
                  type="number"
                  value={jobDetails.salary}
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