import React, {useEffect, useState} from "react";
import axios from "axios";

import {useNavigate, useParams} from "react-router-dom";
import login from "../styles/Login.module.css";

const EditCategory = () => {

const {user_id} = useParams()
    const navigate = useNavigate();
    const clickToBackHandler = () => {
        navigate('/restaraunt/category');
    }

    const [userField, setUserField] = useState({
         name: "",
        price: Number,
        discount: Number,
        description: "",
        categories_id: Number,
        img: ''
    });

    useEffect(() => {
        fetchUser();
    }, [user_id])

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            const result = await axios.get("http://127.0.0.1:25000/category/type/" + user_id, {
                url: 'http://127.0.0.1:25000/category/type/'+ user_id,
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
            await axios.patch("http://127.0.0.1:25000/category/type/" + user_id, userField, {
                url: 'http://127.0.0.1:25000/users/',
                method: 'patch',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Role: role
                }
            });
            navigate('/restaraunt/category');
        } catch (err) {
            console.log("Something Wrong");
        }


    }
        return (
              <body  className={login.body}>
        <div className={login.wrapper}>
            <div className={login.title}><span>Edit Category Form</span></div>
            <form action="#" method="post" id="EditCategoryForm" >



                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="category_type" type="text" placeholder="Category Name" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>

              <div className={`${login.button} ${login.row}`}>
                    <input type="submit" value="Edit Category Name"  onClick={e => onSubmitChange(e)}/>
                </div>

            </form>

        </div>
        </body>

    )
};



export default EditCategory;