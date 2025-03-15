import { Container, TextField, Button, Typography, Box, Alert, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RecruiterLogin() {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    // Load form data from localStorage if available
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setValue("email", parsedData.email);
      setValue("password", parsedData.password);
    }
  }, [setValue]);

  // Handle form submission
  const onSubmit = async (data: any) => {
    console.log("Form Data:", data); // Console the data
    try {
      setError("");
      setSuccess("");

      // Save form data in localStorage
      localStorage.setItem("formData", JSON.stringify(data));

      // Login API request
      const response = await axios.post("http://127.0.0.1:8000/api/recruiter/login/", data);

      if (response.status === 200) {
        const token = response.data.access;
        const userData = response.data.user; // Assuming the API returns user data
        localStorage.setItem("token", token); // Save JWT token for authentication
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage

        setSuccess("Login successful! Redirecting to dashboard...");

        // Redirect to recruiter dashboard after 2 seconds
        setTimeout(() => {
          router.push("/recruiter/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Recruiter Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", { required: true })}
            required
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            {...register("password", { required: true })}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.3, fontWeight: "bold" }}
          >
            LOGIN
          </Button>

          <Typography align="center" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <Link
              onClick={() => router.push("/recruiter/sign-up")}
              sx={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Create a new account
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
