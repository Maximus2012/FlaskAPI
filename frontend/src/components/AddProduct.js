import React, {useEffect, useState} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";
import login from "../styles/Login.module.css";

const AddProduct = () => {

    const [userField, setUserField] = useState({
        name: "",
        price: Number,
        discount: 0,
        description: "",
        categories_id: Number,
        img: ''
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
    const handleFileUpload = async (e) => {
        e.preventDefault();
    // get the selected file from the input
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    const responce = await axios.post("http://127.0.0.1:25000/category/", formData);
    }
    // create a new FormData object and append the file to it

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
                userField['price'] = Number(userField['price'])
            userField['discount'] = Number(userField['discount'])
            userField['categories_id'] = Number(userField['categories_id'])
            const responce = await axios.post("http://127.0.0.1:25000/category/", userField);
            console.log(responce)
            setLoading(true);
            var response_answer = await responce
            console.log(response_answer)
            navigate('/restaraunt/product')


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
            <div className={login.title}><span>Add Product Form</span></div>
            <form action="#" method="post" id="AddProductForm" >
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
                    <input type="submit" value="Add Product"  onClick={e => onSubmitChange(e)}/>
                </div>


            </form>

        </div>
        </body>

    )
};

}

export default AddProduct;