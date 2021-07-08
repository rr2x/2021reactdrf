import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';

import Login from './public/Login';
import Register from './public/Register';

import Dashboard from './secure/dashboard/Dashboard';
import Users from './secure/users/Users';
import RedirectToDashboard from './secure/RedirectToDashboard';
import UserCreate from './secure/users/UserCreate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={RedirectToDashboard} />
        <Route path={'/dashboard'} exact component={Dashboard} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
        <Route path={'/users'} exact component={Users} />
        <Route path={'/users/create'} component={UserCreate} />


      </BrowserRouter>
    </div>
  );
}

export default App;
