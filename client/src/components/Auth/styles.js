import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    wrapper: {
        flexGrow: 1,
        minHeight: '100vh',
    },
    input: {
        marginBottom: '20px'
    },
    form: {
        marginTop: '30px'
    },
    lockIcon: {
        fontSize: '3rem'
    },
    paper: {
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
    },
    alert: {
        marginTop: '20px'
    }
}));
