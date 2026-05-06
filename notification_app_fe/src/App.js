import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AllNotifications from './pages/AllNotifications.js';
import PriorityInbox from './pages/PriorityInbox.js';
import { Log } from 'logging_middleware';

function RouteLogger() {
  const location = useLocation();
  useEffect(() => {
    Log(new Error().stack, 'INFO', 'notification_app_fe', `Navigated to ${location.pathname}`);
  }, [location]);
  return null;
}

export default function App() {
  useEffect(() => {
    Log(new Error().stack, 'INFO', 'notification_app_fe', 'Application Started');
  }, []);

  return (
    <Router>
      <RouteLogger />
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Campus Notifications
          </Typography>
          <Button color="inherit" component={Link} to="/">All</Button>
          <Button color="inherit" component={Link} to="/priority">Priority Inbox</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
        </Routes>
      </Container>
    </Router>
  );
}
