import { gql, useQuery } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { Button } from "../components/Button";
import { meQuery } from "../__generated__/meQuery";
import { Restaurants } from "../pages/client/restaurants";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { NotFound } from "../pages/404";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;
const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
};