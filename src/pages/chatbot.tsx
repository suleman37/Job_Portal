import { useEffect } from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";

export default function ChatbotPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://code.tidio.co/fekh1xywtlnivpavds1d9o7m8e7jmzlu.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "96vh" }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Chatbot Support</Typography>
        </Toolbar>
      </AppBar>
      {/* Chatbot Section */}
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          py: 5,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
          flexGrow: 1, // Keeps content centered
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Chat with Us
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Our chatbot is here to assist you.
        </Typography>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 2, textAlign: "center", backgroundColor: "#1976d2", color: "#fff", mt: "auto" }}>
        <Typography variant="body2">© 2025 Chatbot Inc. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}
