import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function RecruiterSignup() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: any) => {
    try {
      setError("");
      setSuccess("");
      const response = await axios.post("http://127.0.0.1:8000/api/recruiter/register/", data);
      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => router.push("/recruiter/login"), 2000);
      }
    } catch (err: any) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Recruiter Signup
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username")}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            {...register("email")}
            required
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            {...register("password")}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.3, fontWeight: "bold" }}
          >
            SIGN UP
          </Button>
        </form>
      </Box>
    </Container>
  );
}
