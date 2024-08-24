import  axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, NavLink} from 'react-router-dom';
import admin from "../styles/admin.module.css";
import login from "../styles/Login.module.css";
import main from "../styles/Main.module.css";

const ViewProduct = () => {
    const {user_id} = useParams();
    // console.log(id);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [user_id]);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            const result = await axios.get("http://127.0.0.1:25000/category/" + user_id,
                {
                url: 'http://127.0.0.1:25000/category/'+user_id,
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Role: role
                }
            });
            console.log(result.data);
            setUser(result.data)

        } catch (err) {
            console.log("Something Wrong");
        }
    }

    const clickToBackHandler = () => {
        navigate('/restaraunt/product');
    }

    return <body className={admin.body}>
    <div className={admin.container}>
       <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Img</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Description</th>
                    <th>Categories_id</th>

                </tr>
                </thead>
                <tbody>
            {

                <tr>
                                <td>{user.id}</td>

                                    {user.img === undefined
    ? <>< />
    : <td>  <img src={require(`../Main/img/ingredients/${user.img}`)} alt="" className={main.images_small}/> </td>}

                                <td>{user.name} </td>
                                <td>{user.price} </td>
                                <td>{user.discount} </td>
                                <td>{user.description} </td>
                                <td>{user.categories_id} </td>

                </tr>


            }

            </tbody>

        </table>
        <div className={login.alingcenter}>
            <button className={`${login.btncenter} ${login.btnnewgreen}`} onClick={clickToBackHandler}>Back To Home</button>
        </div>

    </div>

    </body>

};

export default ViewProduct;