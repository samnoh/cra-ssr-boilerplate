import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('./pages/HomePage'));
const UsersPage = loadable(() => import('./pages/UsersPage'));
const UserPage = loadable(() => import('./pages/UserPage'));
const PostsPage = loadable(() => import('./pages/PostsPage'));
const NotFound = loadable(() => import('./components/NotFound'));

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users" component={UsersPage} />
            <Route path="/users/:id" render={({ match }) => <UserPage id={match.params.id} />} />
            <Route exact path="/posts" component={PostsPage} />
            <Route
                path="/:message"
                render={({ match }) => <NotFound message={match.params.message} />}
            />
        </Switch>
    );
};

export default Routes;
