import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
          <Home />
        </IconButton>
        <Typography variant="h6" color="inherit" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none' }}>
          Sitemark
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button color="inherit" component={Link} to="/features">Features</Button>
          <Button color="inherit" component={Link} to="/testimonials">Testimonials</Button>
          <Button color="inherit" component={Link} to="/highlights">Highlights</Button>
          <Button color="inherit" component={Link} to="/pricing">Pricing</Button>
          <Button color="inherit" component={Link} to="/faq">FAQ</Button>
          <Button color="inherit" component={Link} to="/blog">Blog</Button>
        </Box>
        <Button color="inherit" component={Link} to="/signin">Sign in</Button>
        <Button variant="contained" color="primary" component={Link} to="/signup">Sign up</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
