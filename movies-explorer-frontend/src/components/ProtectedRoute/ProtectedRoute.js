import React from "react";
import { Route, Redirect } from "react-router-dom";

// Этот компонент принимает другой компонент в качестве пропса
// Он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.logIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;
