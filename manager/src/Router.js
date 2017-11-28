import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

const RouterComponent = () => {
  return (
    <Router>
    <Scene key='root'>
      <Scene key="login" title="Please Login" component={LoginForm} />
      <Scene key="employeeList" title="Employees" component={EmployeeList} />
    </Scene>
    </Router>
  );
};

export default RouterComponent;
