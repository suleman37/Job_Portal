import { Container, TextField, Button, Typography, Box, Card, CardContent, Link, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: any) => {
    try {
      setError("");
      // Correct Login Endpoint -> /api/admin/login/
      const response = await axios.post("http://127.0.0.1:8000/api/admin/login/", data);
  
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem("token", access);  // ✅ Store Access Token
        localStorage.setItem("refresh", refresh);  // Optionally store Refresh Token
  
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => router.push("/admin/dashboard"), 2000);  // Redirect
      }
    } catch (err: any) {
      console.error(err);
      setError("Login failed. Please check credentials.");
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card sx={{ width: '100%', p: 4, borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold", mb: 3 }}>
              Login as Admin
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField label="Email" type="email" fullWidth margin="normal" {...register("email", { required: true })} />
              <TextField label="Password" type="password" fullWidth margin="normal" {...register("password", { required: true })} />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5, fontWeight: "bold", fontSize: "16px" }}>
                LOGIN
              </Button>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don't have an account?{" "}
              <Link href="/admin/sign-up" sx={{ cursor: "pointer", fontWeight: "bold" }}>
                Create a new account
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
