import logo from './logo.svg';

import Login from './components/Login'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import Admin from "./components/Admin";

import View from "./components/View";
import Edit from "./components/Edit";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/auth/login" element={<Login/>}></Route>
            <Route exact path="/auth/register" element={<Register/>}></Route>
            <Route exact path="/users/:user_id" element={<View/>}/>
              <Route exact path="/users/patch/:user_id" element={<Edit/>}/>
            <Route exact path="/users/admin" element={<Admin/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
