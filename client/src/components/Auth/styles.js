import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    wrapper: {
        flexGrow: 1,
        minHeight: '100vh',
    },
    input: {
        marginBottom: '20px',
        // width: '70%',
    },
    btnSubmit: {
        // width: '70%',
    },
    form: {
        width: '400px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
