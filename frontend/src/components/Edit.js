import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import login from "../styles/Login.module.css";

const Edit = () => {
    const {user_id} = useParams()
    const navigate = useNavigate();
    const clickToBackHandler = () => {
        navigate('/users/admin');
    }

    const [userField, setUserField] = useState({
        email: "",
        name: "",
        password: ""
    });

    useEffect(() => {
        fetchUser();
    }, [user_id])

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            const result = await axios.get("http://127.0.0.1:25000/users/" + user_id, {
                url: 'http://127.0.0.1:25000/users/',
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Role: role
                }
            });
            // console.log(result.data);
            setUserField(result.data)
        } catch (err) {
            console.log("Something Wrong");
        }
    }

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            await axios.patch("http://127.0.0.1:25000/users/" + user_id, userField, {
                url: 'http://127.0.0.1:25000/users/',
                method: 'patch',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Role: role
                }
            });
            navigate('/users/admin');
        } catch (err) {
            console.log("Something Wrong");
        }
    }
        const onSubmitChangeRole = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            await axios.patch("http://127.0.0.1:25000/users/role/" + user_id, userField, {
                url: 'http://127.0.0.1:25000/users/role/',
                method: 'patch',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Role: role
                }
            });
            navigate('/users/admin');
        } catch (err) {
            console.log("Something Wrong");
        }
    }

    return (

          <body  className={login.body}>
        <div className={login.wrapper}>
            <div className={login.title}><span>Update Form</span></div>
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
                    <input type="submit" value="Update" onClick={e => onSubmitChange(e)}/>
                </div>


            </form>
               <form action="#" method="post" id="loginform">
                <div className={login.row}>
                    <i className={`${login.fas} `}></i>
                    <input name="role_id" type="text" placeholder="Role_id" required
                           onChange={e => changeUserFieldHandler(e)}/>
                    <div className={`${login.button} ${login.row}`}>
                    <input type="submit" value="Update" onClick={e => onSubmitChangeRole(e)}/>
                </div>
                </div>
                    </form>

        <div className={login.alingcenter}>
                <button className={`${login.btncenter} ${login.btnnewgreen}`} onClick={clickToBackHandler}>Back To Home</button>
            </div>

        </div>
        </body>

    )
};


export default Edit;