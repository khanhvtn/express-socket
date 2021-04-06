import React from 'react';
import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Error from './components/Error/Error';
const App = () => {
    const css = useStyles();
    return (
        <div className={css.wrapper}>
            <Container className={css.container} maxWidth="lg">
                <Switch>
                    <Route exact path="/" component={Auth} />
                    <Route exact path="/home" component={Home} />
                    <Route component={Error} />
                </Switch>
            </Container>
        </div>
    );
};

export default App;
