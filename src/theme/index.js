import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#003580', // интенсивный синий BookingForge
            light: '#0065bd',
            dark: '#00224f',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f5a623', // золотистый для акцентов
            light: '#ffb951',
            dark: '#c67c00',
            contrastText: '#fff',
        },
        success: {
            main: '#008009', // зеленый для цен со скидкой
            light: '#34b93c',
            dark: '#006000',
        },
        info: {
            main: '#0071c2', // второй синий оттенок
            light: '#4c9fef',
            dark: '#004682',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#6b6b6b',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
        fontFamily: [
            'BlinkMacSystemFont',
            '-apple-system',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '2.2rem',
        },
        h2: {
            fontWeight: 700,
            fontSize: '1.8rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.4rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.2rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.1rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 2,
                    padding: '8px 16px',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    },
                },
                containedPrimary: {
                    backgroundImage: 'linear-gradient(to bottom, #0071c2, #003580)',
                    '&:hover': {
                        backgroundImage: 'linear-gradient(to bottom, #0065bd, #00224f)',
                    },
                },
                containedSecondary: {
                    backgroundImage: 'linear-gradient(to bottom, #ffb951, #f5a623)',
                    '&:hover': {
                        backgroundImage: 'linear-gradient(to bottom, #ffa000, #c67c00)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 2,
                                borderColor: '#0071c2',
                            },
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                },
                colorPrimary: {
                    backgroundImage: 'linear-gradient(to right, #003580, #0071c2)',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    minWidth: 'auto',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0071c2',
                    color: '#fff',
                },
            },
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme; 