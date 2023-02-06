import React, { Fragment ,useState} from "react";
import './App.css';
import Sidebar from "./sidebar/Sidebar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login/Login";

export const ParentContext = React.createContext();
function App() {
  const [login,setLogin] = useState(localStorage.getItem("email"));
  const [auth, setAuth] = useState(login!=null ? true :false);

  return (
    <div className="App">
       <ParentContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter basename={"/"}>
      { (auth==true) &&
          <Sidebar />
}
      { (auth==false ) &&
           <Fragment>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <div className="body flex-grow-1 px-3">
             
                <Routes>
                  <Route path='/' element={<Login />} ></Route>
                  <Route path="/login" element={<Login />}></Route>
                </Routes>
              </div>
            </div>
          </Fragment>
}

      </BrowserRouter>
      </ParentContext.Provider>
    </div>
  );
}
export default App;
