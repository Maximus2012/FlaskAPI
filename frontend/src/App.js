import logo from './logo.svg';

import Login from './components/Login'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import Admin from "./components/Admin";

import View from "./components/View";
import Edit from "./components/Edit";
import Main from "./components/Main";
import Product from "./components/AddProduct";
import RestarauntProduct from "./components/Restaraunt";
import ViewProduct from "./components/ViewProduct";
import EditProduct from "./components/EditProduct";
import React from "react";
import AddCategory from "./components/AddCategory";
import RestarauntCategory from "./components/RestarauntCategory";
import ViewCategory from "./components/ViewCategory";
import EditCategory from "./components/EditCategory";
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
          <Route exact path={"/"} element={<Main/>}></Route>
          <Route exact path={"/product"} element={<Product/>}></Route>
          <Route exact path={"/restaraunt/product"} element={<RestarauntProduct/>}></Route>
          <Route exact path={"/restaraunt/product/:user_id"} element={<ViewProduct/>}></Route>
          <Route exact path={"/restaraunt/edit/product/:user_id"} element={<EditProduct/>}></Route>
          <Route exact path={"/restaraunt/add/category"} element={<AddCategory/>}></Route>
          <Route exact path={"/restaraunt/category"} element={<RestarauntCategory/>}></Route>
          <Route exact path={"/restaraunt/category/:user_id"} element={<ViewCategory/>}></Route>
          <Route exact path={"/restaraunt/edit/:user_id"} element={<EditCategory/>}></Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
