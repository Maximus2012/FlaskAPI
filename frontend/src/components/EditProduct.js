import React, {useEffect, useState} from "react";
import axios from "axios";

import {useNavigate, useParams} from "react-router-dom";
import login from "../styles/Login.module.css";

const EditProduct = () => {

const {user_id} = useParams()
    const navigate = useNavigate();
    const clickToBackHandler = () => {
        navigate('restaraunt/product');
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

         const handleFileUpload = async (e) => {
        e.preventDefault();
    // get the selected file from the input
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    const responce = await axios.patch("http://127.0.0.1:25000/category/product/"+ user_id, formData);
    }
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            const result = await axios.get("http://127.0.0.1:25000/category/" + user_id, {
                url: 'http://127.0.0.1:25000/category/',
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
            await axios.patch("http://127.0.0.1:25000/category/product/" + user_id, userField, {
                url: 'http://127.0.0.1:25000/users/',
                method: 'patch',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Role: role
                }
            });
            navigate('/restaraunt/product');
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
            <div className={login.title}><span>Edit Product Form</span></div>
            <form action="#" method="post" id="EditProductForm" >
                    <div className={login.row}>
                    <i className={`${login.fas}${login.alingcenter} `}></i>
                    <input name="img" type="file" placeholder="File  " className={login.alingcenter} required
                           onChange={e => handleFileUpload(e)}
                    />
                </div>


                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="name" type="text" placeholder="Name" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="price" type="text" placeholder="Price" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="discount" type="text" placeholder="Discount" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="description" type="text" placeholder="Description" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={login.row}>
                    <i className={`${login.fas}`}></i>
                    <input name="categories_id" type="text" placeholder="Categories_id" required
                           onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className={`${login.button} ${login.row}`}>
                    <input type="submit" value="Edit Product"  onClick={e => onSubmitChange(e)}/>
                </div>


            </form>

        </div>
        </body>

    )
};



export default EditProduct;