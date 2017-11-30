import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

const RouterComponent = () => {
  return (
    <Router>
    <Scene key="root" hideNavBar>
    <Scene key="auth">
    <Scene key="login" title="Please Login" component={LoginForm} />
    </Scene>
    <Scene key="main">
    <Scene key="employeeList" title="Employees" component={EmployeeList} />
    </Scene>
    </Scene>
    </Router>
  );
};

export default RouterComponent;
