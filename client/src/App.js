import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './components/shared/store';
import { theme } from './components/shared/theme';
import Chat from './components/Chat/Chat';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Main from './components/Conversations/Main';
import ProfilePage from './components/ProfilePage/profilePage';
import RelevanceMessages from './components/Chat/RelevanceMessages';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Welcome />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/relevance" element={<RelevanceMessages />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
