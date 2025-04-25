import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Slider
} from '@mui/material';

export default function SidebarFilters() {
  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Фильтры</Typography>

      <Typography variant="subtitle2" gutterBottom>Рейтинг</Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="5 звёзд" />
        <FormControlLabel control={<Checkbox />} label="4+ звезды" />
        <FormControlLabel control={<Checkbox />} label="3+ звезды" />
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" gutterBottom>Цена (₽)</Typography>
      <Slider
        value={[2000, 10000]}
        min={1000}
        max={20000}
        step={500}
        valueLabelDisplay="auto"
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" gutterBottom>Удобства</Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Бесплатный Wi-Fi" />
        <FormControlLabel control={<Checkbox />} label="Бассейн" />
        <FormControlLabel control={<Checkbox />} label="Ресторан" />
        <FormControlLabel control={<Checkbox />} label="Парковка" />
      </FormGroup>
    </Box>
  );
}
