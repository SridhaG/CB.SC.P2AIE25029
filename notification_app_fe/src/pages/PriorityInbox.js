import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../api.js';
import { NotificationHeap } from '../utils.js';
import { Card, CardContent, Typography, Chip, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Log } from 'logging_middleware';

export default function PriorityInbox() {
  const [topNotifications, setTopNotifications] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    loadPriority();
  }, [limit]);

  const loadPriority = async () => {
    Log(new Error().stack, 'INFO', 'notification_app_fe', `Loading Priority Inbox`);
    const allData = await fetchNotifications(100, 1, '');
    
    const heap = new NotificationHeap(limit);
    allData.forEach(n => heap.insert(n));
    setTopNotifications(heap.getTop());
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Priority Inbox</Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Limit</InputLabel>
          <Select value={limit} label="Limit" onChange={(e) => setLimit(e.target.value)}>
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {topNotifications.map((n, index) => (
          <Grid item xs={12} key={n.ID}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="bold">
                    #{index + 1} - {n.Message}
                  </Typography>
                  <Chip label={n.Type} />
                </Box>
                <Typography color="text.secondary" sx={{ mt: 1 }}>{n.Timestamp}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
