import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main';

function App() {
  const users = useSelector((state) => state.userList.users);

  console.log(users);
  return (
    <div className='App'>
      <Router>
        <div>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/users' />
            </Route>
            <Route path='/users/:userName'>
              <Main />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
