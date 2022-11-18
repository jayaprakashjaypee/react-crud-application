import { Route, Switch, Redirect } from "react-router-dom";
import { AddUser } from "./AddUser.js";

import { Sidebar } from "./Sidebar";

import { AllUsers } from "./AllUsers.js";

import "../css/ResponsiveTable.css";

export function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="d-flex Dashboard-con ">
        <Sidebar />
        <Switch>
          <Route exact path="/Dashboard/AddUser">
            <AddUser />
          </Route>

          {/* <Route path="/">
                    <Redirect to="/Dashboard/AllUsers" />
                  </Route> */}
          <Route path="/Dashboard/AllUsers">
            <AllUsers />
          </Route>
          <Route exact path="/">
            Task 29: Design an UI to implement the CRUD // CRUD -
            Create,Read,Update,Delete //
          </Route>
          <Route Path="**">404 NOT FOUND</Route>
        </Switch>
      </div>
    </div>
  );
}
