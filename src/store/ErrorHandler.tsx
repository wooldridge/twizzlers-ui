import React from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';

const ErrorHandler = ({ children }) => {
  const location = useLocation();

  switch (get(location.state, 'errorStatusCode')) {
    case 404:
      return <h1>404 Error!</h1>;
    
    // ... cases for other types of errors
    case 401:
        return <h1>404 Error!</h1>;

    default:
      return children
  }
};

export default ErrorHandler;