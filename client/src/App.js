import React, { useEffect } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { Switch, Route, useHistory } from 'react-router-dom';
import useStyles from './styles';
import AdminHome from "./components/Admin/Home/Home";
import ReviewerHome from "./components/Reviewer/Home/Home";
import MemberHome from "./components/Member/Home/Home";
import Auth from './components/Auth/Auth';
import Error from './components/Error/Error';
import PrivateRoute from './components/Routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './actions/user'
const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => state);
    const css = useStyles();
    useEffect(() => {
        dispatch(checkUser(history))
    }, [])
    return (
        <div className={css.wrapper}>
            <Container className={css.container} maxWidth="lg">
                {
                    user.isCheckingUser ? <CircularProgress color="inherit" /> : <Switch>
                        <Route exact path="/" component={Auth} />
                        <Route exact path="/admin">
                            <Switch>
                                <PrivateRoute path="/" component={AdminHome} />
                            </Switch>
                        </Route>
                        <Route exact path="/reviewer">
                            <Switch>
                                <Route path="/" component={ReviewerHome} />
                            </Switch>
                        </Route>
                        <Route exact path="/member">
                            <Switch>
                                <Route path="/" component={MemberHome} />
                            </Switch>
                        </Route>
                        <Route component={Error} />
                    </Switch>
                }
            </Container>
        </div>
    );
};

export default App;
