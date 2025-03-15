import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Card, CardContent, Grid, Alert, Divider, AppBar, Toolbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

const CandidateDashboard = () => {
  const [profile, setProfile] = useState<any>({
    username: "DemoCandidate",
    email: "demo@candidate.com",
    applied_jobs: [1, 2]
  });
  const [jobs, setJobs] = useState<any[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(1);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);
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
        setProfile(profileRes.data);

        // Fetch available jobs from API
        const jobsRes = await axios.get("http://127.0.0.1:8000/api/jobs/");
        console.log("Jobs Data:", jobsRes.data);
        setJobs(jobsRes.data);

        // Fetch application data for the selected job
        const applicationRes = await axios.get(`http://127.0.0.1:8000/apply/${selectedJobId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`Application Data for Job ID ${selectedJobId}:`, applicationRes.data);
        setAppliedJobs(applicationRes.data); // Store application data
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please make sure you are logged in.");
      }
    };

    fetchData();
  }, [router]);

  const handleOpenDialog = (jobId: number) => {
    setSelectedJobId(jobId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJobId(null);
    setCoverLetter("");
    setResume(null);
  };

  const handleApplyJob = async () => {
    if (selectedJobId === null || !resume) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("cover_letter", coverLetter); // Updated field name
    formData.append("cv", resume); // Updated field name

    try {
      await axios.post(`http://127.0.0.1:8000/apply/${selectedJobId}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });
      alert("Successfully applied to the job!");
      handleCloseDialog();
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
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Candidate Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} mt={2}>
        <Typography variant="h4" fontWeight="bold">Welcome, {profile?.username || "Candidate"}!</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">Your Profile</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Email: {profile?.email}</Typography>
          <Typography>Applied Jobs: {appliedJobs.length}</Typography> {/* Updated to show the number of applied jobs */}
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ mb: 2 }} fontWeight="bold">Available Jobs</Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => {
          const isApplied = appliedJobs.some(application => application.user === profile.id && application.job === job.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{job.title}</Typography>
                  <Typography>Description: {job.description}</Typography>
                  <Typography>Location: {job.location}</Typography>
                  <Typography>Salary: {job.salary}</Typography>
                  <Typography>Created At: {new Date(job.created_at).toLocaleDateString()}</Typography>
                  <Typography>Active: {job.is_active ? "Yes" : "No"}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleOpenDialog(job.id)}
                    disabled={isApplied}
                  >
                    {isApplied ? "Applied" : "Apply Now"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Apply for Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a cover letter and attach your resume for your application.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="coverLetter"
            label="Cover Letter"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApplyJob} color="primary" disabled={!resume}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Box mt={5}>
        <Typography variant="h5" sx={{ mb: 2 }} fontWeight="bold">AI Practice Interviews</Typography>
        <Typography>Prepare for your interviews using our AI-driven practice module.</Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => router.push("/candidate/ai-interview")}>
          Start AI Interview
        </Button>
      </Box>
    </Container>
  );
};

export default CandidateDashboard;