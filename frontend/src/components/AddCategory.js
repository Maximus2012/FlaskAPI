import React, {useEffect, useState} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";
import login from "../styles/Login.module.css";

const AddCategory = () => {

    const [userField, setUserField] = useState({
        category_type: "",

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

            const responce = await axios.post("http://127.0.0.1:25000/category/type", userField);
            console.log(responce)
            setLoading(true);
            var response_answer = await responce
            console.log(response_answer)
            navigate('/restaraunt/category')


        } catch (err) {

            setLoading(true);
            const responce = await err
            console.log(responce)

            console.log("Something Wrong");

        }
    }

    {
        return (
              <body  className={login.body}>
        <div className={login.wrapper}>
            <div className={login.title}><span>Add Category Form</span></div>
            <form action="#" method="post" id="AddProductForm" >
                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="category_type" type="text" placeholder="Category name" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>

                <div className={`${login.button} ${login.row}`}>
                    <input type="submit" value="Add Category"  onClick={e => onSubmitChange(e)}/>
                </div>


            </form>

        </div>
        </body>

    )
};

}

export default AddCategory;