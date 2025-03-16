import { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";

export default function Chatbot() {
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
    <Container maxWidth="sm" sx={{ textAlign: "center", py: 5, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chat with Us
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Our chatbot is here to assist you.
      </Typography>
    </Container>
  );
}
