// import {createBrowserRouter,RouterProvider} from 'react-router-dom';
// import { AuthContext } from "./contest/AuthContext";

// const router=createBrowserRouter([
//   {
//     path:"/",
//     element:<Home/>
//   },
//   {
//     path:"/login",
//     element:<Login/>
//   },
//   {
//     path:"/register",
//     element:<Register/>
//   },
//   {
//     path:"/profile/:username",
//     element:<Profile  />
//   }
// ])
// function App() {

//   const {user}=useContext(AuthContext);
//   return (
//     <div className="App">
//       <RouterProvider router={router}/>
//     </div>
//   );
// }

// export default App;

import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import { AuthContext } from "./contest/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route  path="/profile/:username" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
