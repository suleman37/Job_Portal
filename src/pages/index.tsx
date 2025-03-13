import { Container, Typography, Button, Box, Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #141E30, #243B55)",
        color: "white",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            padding: 4,
            borderRadius: 4,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Welcome to Job Portal
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ opacity: 0.8, mb: 3 }}>
              Please select your role to continue.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1E88E5",
                  fontSize: "16px",
                  fontWeight: "bold",
                  padding: "12px",
                  "&:hover": { backgroundColor: "#1565C0" },
                }}
                onClick={() => router.push("/admin/login")}
              >
                Admin Login
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8E24AA",
                  fontSize: "16px",
                  fontWeight: "bold",
                  padding: "12px",
                  "&:hover": { backgroundColor: "#6A1B9A" },
                }}
                onClick={() => router.push("/candidate/login")}
              >
                Candidate Login
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#43A047",
                  fontSize: "16px",
                  fontWeight: "bold",
                  padding: "12px",
                  "&:hover": { backgroundColor: "#2E7D32" },
                }}
                onClick={() => router.push("/recruiter/login")}
              >
                Recruiter Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
