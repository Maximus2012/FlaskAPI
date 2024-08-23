import React, {useEffect, useState} from "react";
import axios from "axios";
import register from "../styles/Login.module.css";
import {useNavigate} from "react-router-dom";
import login from "../styles/Login.module.css";

var answer = ''
const Register = () => {
    const [userField, setUserField] = useState({
        email: "",
        name: "",
        password: ""
    });
    const navigate = useNavigate();

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        //console.log(userField);

    }
    const [loading, setLoading] = useState()

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce = await axios.post("http://127.0.0.1:25000/auth/register", userField);
            console.log(responce)
            setLoading(true);
            var response_answer = await responce
            console.log(response_answer)
            answer = 'Registration succeed'
            navigate('/auth/login')
        } catch (err) {

            setLoading(true);
            const responce = await err
            console.log(responce)
            answer = responce['response']['data']
            console.log("Something Wrong");
            console.log(answer)
        }
    }
    if (loading) {
        return <Register/>
    }
    return (
         <body  className={login.body}>
        <div className={login.wrapper}>
            <div className={login.title}><span>Register Form</span></div>
            <form action="#" method="post" id="loginform">
                <div className={login.row}>
                    <i className={`${login.fas} `}></i>
                    <input name="email" type="text" placeholder="Email" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={login.row}>
                    <i className={`${login.fas} `}></i>
                    <input name="name" type="text" placeholder="Name" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="password" type="password" placeholder="Password" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={`${login.button} ${login.row}`}>
                    <input type="submit" value="Register" onClick={e => onSubmitChange(e)}/>
                </div>
                 <div className={login.signuplink}>Already exist? <a href="/auth/login">Sign in now</a></div>

            </form>

        </div>
        </body>

    )
};

export default Register;