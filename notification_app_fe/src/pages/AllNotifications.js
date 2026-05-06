import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../api.js';
import { Card, CardContent, Typography, Chip, Grid, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import { Log } from 'logging_middleware';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [viewedIds, setViewedIds] = useState(() => JSON.parse(localStorage.getItem('viewedNotifications') || '[]'));

  useEffect(() => {
    fetchNotifications(20, page, filter).then(setNotifications);
  }, [filter, page]);

  const markViewed = (id) => {
    if (!viewedIds.includes(id)) {
      const newViewed = [...viewedIds, id];
      setViewedIds(newViewed);
      localStorage.setItem('viewedNotifications', JSON.stringify(newViewed));
      Log(new Error().stack, 'INFO', 'notification_app_fe', `Viewed notification ${id}`);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">All Notifications</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter Type</InputLabel>
          <Select value={filter} label="Filter Type" onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {notifications.map(n => {
          const isViewed = viewedIds.includes(n.ID);
          return (
            <Grid item xs={12} key={n.ID}>
              <Card onClick={() => markViewed(n.ID)} sx={{ cursor: 'pointer', opacity: isViewed ? 0.6 : 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={isViewed ? "normal" : "bold"}>
                      {n.Message}
                    </Typography>
                    <Chip label={n.Type} />
                  </Box>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>{n.Timestamp}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2, mb: 4 }}>
        <Button disabled={page === 1} onClick={() => setPage(p => p - 1)} variant="outlined">Previous</Button>
        <Button onClick={() => setPage(p => p + 1)} variant="outlined">Next</Button>
      </Box>
    </Box>
  );
}
