import React from "react"
import { Container } from "@material-ui/core"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import PostDetails from "./components/PostDetails/PostDetails"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag"
import Messenger from "./components/Messenger/Messenger"
import UserProfile from "./components/UserProfile/UserProfile"

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route
            path={["/creators/:name", "/tags/:name"]}
            component={CreatorOrTag}
          />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
          <Route path="/profile" exact component={() => (!user ? <Redirect to="/auth" />: <UserProfile/> )} />
          <Route path="/messenger" exact component={Messenger} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
