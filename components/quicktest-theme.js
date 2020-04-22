import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#b39ddb',
            main: '#673ab7',
            dark: '#4527a0',
            contrastText: "#fff"
        },
        secondary: {
            light: '#66fff9',
            main: '#03dac6',
            dark: '#00a896',
            contrastText: '#000'
        },
        danger: {
            light: '#ef5350',
            main: '#d32f2f',
            dark: '#b71c1c',
            contrastText: '#fff',
        },
        warning: {
            light: '#ffd54f',
            main: '#ffc107',
            dark: '#ff8f00',
            contrastText: '#000',
        }
    },
    typography: {
        useNextVariants: true
    }

});