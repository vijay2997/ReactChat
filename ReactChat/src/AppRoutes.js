import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Userlist from "./components/user/Userlist";
import Adduser from "./components/user/Adduser";
import Login from "./components/login/Login"
const AppRoutes = () => (
    <>
      <div className="App" id="wrapper">

          <Fragment>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <div className="body flex-grow-1 px-3">
			
              <Routes>
                <Route path = "/dashboard" exact element = {<Dashboard />}></Route>
				        <Route path = "/userlist" exact element = {<Userlist />}></Route>
				        <Route path = "/adduser" exact element = {<Adduser />}></Route>
                <Route path = "/user/edit/:id" exact element = {<Adduser />}></Route>
			        </Routes>
             </div>
            </div>
          </Fragment>
      </div>
    </>
  );
export default AppRoutes;