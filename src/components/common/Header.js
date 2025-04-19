import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  BedOutlined,
  Notifications,
  Language,
  AccountCircle,
  Person,
} from '@mui/icons-material';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  // Имитация авторизованного пользователя
  const [user] = useState({
    name: 'Иван Петров',
    email: 'ivan@example.com',
    isLoggedIn: true
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 64 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mr: 3,
              }}
            >
              TravelForge
            </Typography>

            {isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              <>
                {/* Navigation tabs */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <Button
                    color="inherit"
                    startIcon={<BedOutlined />}
                    component={RouterLink}
                    to="/"
                    sx={{ mr: 1, fontWeight: 'bold', whiteSpace: 'nowrap' }}
                  >
                    Отели
                  </Button>
                </Box>

                {/* User section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/bookings"
                    sx={{ mr: 1 }}
                  >
                    Мои бронирования
                  </Button>
                  <IconButton color="inherit" sx={{ mr: 1 }}>
                    <Badge badgeContent={2} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'white' }}>
                      {user.isLoggedIn ? (
                        <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          {user.name.charAt(0)}
                        </Typography>
                      ) : (
                        <AccountCircle color="primary" />
                      )}
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    {user.isLoggedIn && (
                      <MenuItem disabled sx={{ opacity: 1 }}>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">{user.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                        </Box>
                      </MenuItem>
                    )}

                    <MenuItem
                      component={RouterLink}
                      to="/bookings"
                      onClick={handleClose}
                    >
                      Мои бронирования
                    </MenuItem>

                    {user.isLoggedIn ? (
                      <>
                        <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
                        <Divider />
                        <MenuItem
                          component={RouterLink}
                          to="/admin"
                          onClick={handleClose}
                        >
                          Админ панель
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Выйти</MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem onClick={handleClose}>Войти</MenuItem>
                        <MenuItem onClick={handleClose}>Зарегистрироваться</MenuItem>
                      </>
                    )}
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile menu */}
      <Menu
        anchorEl={mobileMenuAnchorEl}
        open={Boolean(mobileMenuAnchorEl)}
        onClose={handleMobileMenuClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          component={RouterLink}
          to="/"
          onClick={handleMobileMenuClose}
        >
          <BedOutlined sx={{ mr: 1 }} />
          Отели
        </MenuItem>

        <Divider />

        <MenuItem
          component={RouterLink}
          to="/bookings"
          onClick={handleMobileMenuClose}
        >
          Мои бронирования
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="/admin"
          onClick={handleMobileMenuClose}
        >
          Админ панель
        </MenuItem>
      </Menu>
    </>
  );
}
