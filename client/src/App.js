import React, { useEffect } from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import store, { authActions } from './components/shared/store';
import {GlobalStyle, theme} from './components/shared/theme';
import Chat from './components/Chat/Chat';
import Main from './components/Main/Main';
import Profile from './components/Profile/profile';
import EditProfile from './components/EditProfile/EditProfile';
// import RelevanceMessages from './components/Chat/RelevanceMessages';
import Welcome from './components/Welcome/Welcome';
import EventFlow from './components/EventFlow/EventFlow';

function PrivateRoute({element}) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (!localStorage.getItem('user')) return <Navigate to="/"/>;
  
  if (Object.keys(user).length === 0 && localStorage.getItem('user').length > 0) {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    dispatch(authActions.setUser(loggedUser));
  }

  if (localStorage.getItem('user').length > 0) {
    return element;
  }
  return <Navigate to="/"/>;
}

function App() {
  useEffect(() => {
    // Get the user's location
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const token = 'e87a11528ea378abc061e05fc60e66a5';

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.name)
          localStorage.setItem('location', data.name);
        });
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
       <GlobalStyle/>
        <Router>
          <Routes>
            <Route path="/chat/*" element={<PrivateRoute element={<Chat/>}/>}/>
            {/* <Route path="/relevance/*" element={<PrivateRoute element={<RelevanceMessages />} />}/> */}
            <Route path="/main/*" element={<PrivateRoute element={<Main/>}/>}/>
            <Route path="/profile/*" element={<PrivateRoute element={<Profile/>}/>}/>
            <Route path="/edit- profile/*" element={<PrivateRoute element={<EditProfile/>}/>}/>
            <Route path="/new-event/*" element={<PrivateRoute element={<EventFlow/>}/>}/>
            <Route path="/*" element={<PrivateRoute element={<Main/>}/>}/>
            <Route path="/" element={<Welcome/>}/>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
