import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Card, CardContent, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { loginUser, registerUser } from "../services/auth"; // ✅ Import the API functions

interface AuthFormProps {
  isLogin?: boolean;
  userType: "admin" | "candidate" | "recruiter";
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = true, userType }) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Updated onSubmit function
  const onSubmit = async (data: any) => {
    try {
      setError("");
      setSuccess("");
  
      // Map "name" to "username"
      const payload = isLogin ? data : { ...data, username: data.name };
  
      const response = isLogin
        ? await loginUser(userType, payload)
        : await registerUser(userType, payload);
  
      if (response.status === 200 || response.status === 201) {
        setSuccess(isLogin ? "Login successful! Redirecting..." : "Signup successful! Redirecting to login...");
        reset(); // Clear form
  
        setTimeout(() => {
          router.push(isLogin ? `/${userType}/dashboard` : `/${userType}/login`);
        }, 2000);
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail || "Something went wrong. Please check your details."
      );
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
        <Card sx={{ width: "100%", p: 4, borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold", mb: 3 }}>
              {isLogin ? `Login as ${userType}` : `Sign Up as ${userType}`}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Show Full Name field only in Sign Up */}
              {!isLogin && (
                <TextField
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  {...register("name")}
                />
              )}
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                {...register("email", { required: true })}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password", { required: true })}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {isLogin ? "LOGIN" : "SIGN UP"}
              </Button>
            </form>

            {/* Switch between login and signup */}
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => router.push(`/${userType}/signup`)}
                    sx={{ fontWeight: "bold", padding: 0 }}
                  >
                    Create a new account
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => router.push(`/${userType}/login`)}
                    sx={{ fontWeight: "bold", padding: 0 }}
                  >
                    Login here
                  </Button>
                </>
              )}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AuthForm;
