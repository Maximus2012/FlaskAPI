import React, {useState} from "react";
import login from "../styles/Login.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";


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
    const [loading, setLoading] = useState()
  const navigate = useNavigate();
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce = await axios.post("http://127.0.0.1:25000/auth/login", userField);
            console.log(responce)

            setLoading(true);
            var response_answer = await responce
            var access_token = response_answer['data']['access_token']
            var role = response_answer['data']['role']
            localStorage.setItem('Authorisation', access_token);
            localStorage.setItem('Role', role);
            navigate('/')
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if (loading) {
        return <Login/>
    }

    return (
         <body  className={login.body}>
        <div className={login.wrapper}>
            <div className={login.title}><span>Login Form</span></div>
            <form action="#" method="post" id="loginform">
                <div className={login.row}>
                    <i className={`${login.fas} `}></i>
                    <input name="email" type="text" placeholder="Email" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="password" type="password" placeholder="Password" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={login.pass}><a href="#">Forgot password?</a></div>
                <div className={`${login.button} ${login.row}`}>
                    <input type="submit" value="Login" onClick={e => onSubmitChange(e)}/>
                </div>
                <div className={login.signuplink}>Not a member? <a href="/auth/register">Sign up now</a></div>
            </form>

        </div>
        </body>
    )
};


export default Login;

