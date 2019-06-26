import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('./pages/HomePage'));
const UsersPage = loadable(() => import('./pages/UsersPage'));
const NotFound = loadable(() => import('./components/NotFound'));

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users" component={UsersPage} />
            <Route
                path="/:message"
                render={({ match }) => <NotFound message={match.params.message} />}
            />
        </Switch>
    );
};

export default Routes;
