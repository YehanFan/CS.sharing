import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.scss";
import socket from "./config/socket";

import Layout from "./components/Layout/Layout";

import PrivateRoute from "./routing/PrivateRoute";

import Home from "./pages/Home/Home";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import Post from "./pages/Post/Post";
import NewPost from "./pages/NewPost/NewPost";
import Lists from "./pages/Lists/Lists";
import List from "./pages/List/List";
import Notifications from "./pages/Notifications/Notifications";
import Settings from "./pages/Settings/Settings";
import Search from "./pages/Search/Search";
import NotFound from "./pages/NotFound/NotFound";

import Code from "./pages/Code/Code";

function App() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        socket.on("connect", () => {
          socket.emit("userConnect", user.id);
        });

        // Try to reconnect again
        socket.on("error", function () {
          socket.emit("userConnect", user.id);
        });
      } catch (e) {
        console.log("ERROR", e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={user?.id ? <Feed /> : <Home />} />
          <Route exact path="/:username" element={<Profile />} />
          <Route exact path="/:username/:postId" element={<Post />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/new-post" element={<NewPost />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route exact path="/:username/lists" element={<Lists />} />
          <Route exact path="/:username/lists/:listId" element={<List />} />
          <Route
            path="/lists"
            element={<Navigate replace to={`/${user?.username}/lists`} />}
          />
          <Route path="/search" element={<Search />} />
          <Route exact path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/code" element={<Code />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
