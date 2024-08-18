import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/Login.css";
var answer = ''
const Register = () => {
   const [userField, setUserField] = useState({
        email: "",
       name: "",
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
            const responce= await axios.post("http://127.0.0.1:25000/auth/register", userField);
            console.log(responce)
            setLoading(true);
            var response_answer =  await responce
            console.log(response_answer)
            answer = 'Registration succeed'
        } catch (err) {

            setLoading(true);
            const responce = await err
            console.log(responce)
            answer = responce['response']['data']
            console.log("Something Wrong");
            console.log(answer)
        }
    }
    if(loading){
        return <Register/>
    }
    return (
        <div className="wrapper">
      <div className="title"><span>Register Form</span></div>
        <form action="#" method="post" id="loginform">
        <div className="row">
          <i className="fas fa-user"></i>
          <input name ="email" type="text" placeholder="Email" required onChange={e => changeUserFieldHandler(e)}  />
        </div>
            <div className="row">
          <i className="fas fa-user"></i>
          <input name ="name" type="text" placeholder="Name" required onChange={e => changeUserFieldHandler(e)} />
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input name ="password" type="password" placeholder="Password" required onChange={e => changeUserFieldHandler(e)}  />
        </div>
        <div className="pass"><a href="#">Forgot password?</a></div>
        <div className="row button">
          <input type="submit" value="Register" onClick={e => onSubmitChange(e)} />
        </div>
        <div className="signup-link">Already exist? <a href="/auth/login">Sign in now</a></div>

      </form>
            <div className="signup-link"> {answer}</div>
        </div>
    )
};

export default Register;