import React, {useState} from "react";
import "../styles/Login.css";
import axios from "axios";

const Login = () => {
   const [userField, setUserField] = useState({
        email: "",
        password: ""
    });

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        //console.log(userField);

    }
    const [loading,setLoading]=useState()

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post("http://127.0.0.1:25000/auth/login", userField);
            console.log(responce)

            setLoading(true);
            var response_answer =  await responce
            var access_token = response_answer['data']['access_token']
            localStorage.setItem('Authorisation', access_token);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if(loading){
        return <Login/>
    }

    return (
        <div className="wrapper">
      <div className="title"><span>Login Form</span></div>
        <form action="#" method="post" id="loginform">
        <div className="row">
          <i className="fas fa-user"></i>
          <input name ="email" type="text" placeholder="Email" required onChange={e => changeUserFieldHandler(e)}  />
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input name ="password" type="password" placeholder="Password" required onChange={e => changeUserFieldHandler(e)}  />
        </div>
        <div className="pass"><a href="#">Forgot password?</a></div>
        <div className="row button">
          <input type="submit" value="Login" onClick={e => onSubmitChange(e)} />
        </div>
        <div className="signup-link">Not a member? <a href="/auth/register">Sign up now</a></div>
      </form>

        </div>

    )
};


export default Login;

