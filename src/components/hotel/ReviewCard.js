import React from 'react';
import { Box, Typography, Avatar, Stack, Rating } from '@mui/material';

export default function ReviewCard({ review }) {
  return (
    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Avatar>{review.userName?.[0] || 'A'}</Avatar>
        <Box>
          <Typography fontWeight="bold">{review.userName || 'Аноним'}</Typography>
          <Rating value={review.rating} readOnly precision={0.5} size="small" />
        </Box>
      </Stack>
      <Typography variant="body2">{review.text}</Typography>
    </Box>
  );
}