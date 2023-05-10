import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './components/shared/store'
import { theme, GlobalStyle } from "./components/shared/theme";
import styled, { ThemeProvider } from "styled-components";


import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Main from './components/Conversations/Main';
import ProfilePage from './components/ProfilePage/profilePage';


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Join} />
          <Route path="/chat" component={Chat} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/main" component={Main} />
          <Route path="/profile" component={ProfilePage} />

        </Router>
      </Provider>
    </ThemeProvider>

  );
}

export default App;
