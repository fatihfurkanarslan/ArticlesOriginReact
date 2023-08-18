import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'



const Notes = lazy(() => import('./components/notes/Notes'));
const Notfound = lazy(() => import('./components/common/Notfound'));
const Home = lazy(() => import('./components/common/Home'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const AllCategories = lazy(() => import('./components/ManagerPanel/AllCategories/AllCategories'));
const UpdateCategory = lazy(() => import('./components/ManagerPanel/AllCategories/UpdateCategory'));
const PageLoading = lazy(() => import('./components/common/PageLoading'));



export default function Routes() {
    return (
        <Suspense>
            <Switch>
                <Route exact path="/Notes/:id" component={Notes} />
                <Route exact path="/" component={Home} />
                <Route exact path="/Profile" component={Profile} />
                <Route exact path="/PageLoading" component={PageLoading} />
                <Route exact path="/AllCategories" component={AllCategories} />
                <Route exact path="/UpdateCategory/:id" component={UpdateCategory} />
                <Route exact path="*" component={Notfound} />
            </Switch>
        </Suspense>
    )
}
