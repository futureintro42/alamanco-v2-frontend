// src/components/WebNavigation.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Link,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const WebNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { key: "Home", to: "https://alamanextuv.com/" },
    { key: "Cards", to: "/cards/search" },
    { key: "Certificates", to: "/certificate/search" },
    { key: "Services", to: "https://alamanextuv.com/ar/services.html" },
    { key: "About", to: "/about" },
    { key: "Contact", to: "https://alamanextuv.com/ar/contact.html" },
  ];

  // Detect scroll for transparent → solid navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 6 : 0} // shadow when scrolling
        sx={{
          transition: "all 0.3s ease",
          backgroundColor: {
            xs: "white", // Mobile: always white
            md: scrolled ? "white" : "transparent", // Desktop: transparent → white
          },
          color: {
            xs: "#1f4074",
            md: scrolled ? "#1f4074" : "white",
          },
          boxShadow: {
            xs: "0px 2px 10px rgba(0,0,0,0.08)", // soft shadow for mobile
            md: scrolled ? "0px 4px 12px rgba(0,0,0,0.1)" : "none",
          },
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/images/logo_clean.png`}
              alt="Company Logo"
              sx={{
                height: "80px",
                width: "80px",
                cursor: "pointer",
                // borderRadius: "50%", // rounded look
                // p: 1,
                // backgroundColor: "transparent",
                // boxShadow: "0px 2px 6px rgba(0,0,0,0.1)", // glow effect
              }}
            />

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 4,
                alignItems: "center",
              }}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.to}
                  underline="none"
                  sx={{
                    color: "#1f4074",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                    position: "relative",
                    "&:hover": { color: "#ffcc00" },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: "0%",
                      height: "2px",
                      bgcolor: "#ffcc00",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": { width: "100%" },
                  }}
                >
                  {item.key}
                </Link>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#1f4074",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.key}
                component="a"
                href={item.to}
                onClick={handleDrawerToggle}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemText
                  primary={item.key}
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#1f4074",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default WebNavigation;
