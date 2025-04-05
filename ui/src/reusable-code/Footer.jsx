
import React from "react";
import { Typography, Box, Container } from "@mui/material";

const Footer = () => {

    return (

<Box component="footer" sx={{ 
    position: "fixed",
    bottom:20,
    left: 0,
    width: "100%",
    textAlign: "center", 
    padding: 2, 
    backgroundColor: "#cce3de",
    boxShadow: 3, 
    mt: "auto" }}
    
    >
        <Container maxWidth="xl" disableGutters>
    <Typography variant="body3">&copy; 2025 DamaDevs Garden Dashboard</Typography>
        </Container>
</Box>
    );
};

export default Footer;