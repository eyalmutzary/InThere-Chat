import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Provider, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import store from './components/shared/store';
import {GlobalStyle, theme} from './components/shared/theme';
import Chat from './components/Chat/Chat';
import Main from './components/Main/Main';
import Profile from './components/Profile/profile';
import EditProfile from './components/EditProfile/EditProfile';
import RelevanceMessages from './components/Chat/RelevanceMessages';
import Welcome from './components/Welcome/Welcome';
import EventFlow from './components/EventFlow/EventFlow';

function PrivateRoute({element}) {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return element;
  }
  return <Navigate to="/"/>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
       <GlobalStyle/>
        <Router>
          <Routes>
            <Route path="/chat/*" element={<PrivateRoute element={<Chat />} />} />
            <Route path="/relevance/*" element={<PrivateRoute element={<RelevanceMessages />} />}/>
            <Route path="/main/*" element={<PrivateRoute element={<Main />} />}/>
            <Route path="/profile/*" element={<PrivateRoute element={<Profile />} />}/>
            <Route path="/edit-profile/*" element={<PrivateRoute element={<EditProfile />} />}/>
            <Route path="/new-event/*" element={<PrivateRoute element={<EventFlow />} />}/>
            <Route path="/*" element={<PrivateRoute element={<Main />} />}/>
            <Route path="/" element={<Welcome/>}/>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
