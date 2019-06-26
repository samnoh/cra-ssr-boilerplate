import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('pages/HomePage'));
const PostPage = loadable(() => import('pages/PostPage'));
const NotFound = loadable(() => import('components/NotFound'));

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/post/:id?" render={({ match }) => <PostPage id={match.params.id} />} />
            <Route
                path="/:message"
                render={({ match }) => <NotFound message={match.params.message} />}
            />
        </Switch>
    );
};

export default Routes;
