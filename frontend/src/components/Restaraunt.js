import React, {useState, useEffect} from 'react';
import axios from 'axios'
import admin from "../styles/admin.module.css";
import main from "../styles/Main.module.css";

const RestarauntProduct = () => {
    const [userData, setUSerData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            console.log(role)
            const result = await axios({
                    url: 'http://127.0.0.1:25000/category/',
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        Role: role
                    }
                })
            ;

            // handle success
            //console.  log(result.data);
            console.log(result.data)
            setUSerData(result.data)
        } catch (err) {
            console.log("something Wrong");
        }
    }


    const handleDelete = async (id) => {
        console.log(id);
        const token = localStorage.getItem('Authorisation');
        const role = localStorage.getItem('Role');
        await axios({
            url: 'http://127.0.0.1:25000/category/product/' + id,
            method: 'delete',
            headers: {
                Authorization: 'Bearer ' + token,
                Role: role
            }
        });
        const newUserData = userData.filter((item) => {
            return (
                item.id !== id
            )
        })
        setUSerData(newUserData);
    }
    return (
        <body className={admin.body}>

        <div className={admin.container}>
            <button className={`${admin.btnnewgreen} ${admin.padding} ${admin.alingCenter}`}
                                            onClick={() => window.location.href = `/product`}>Add product
                                    </button>

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
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    userData.map((categories, i) => {
                        return (
                            <tr>
                                <td>{categories.id}</td>
                                <td><img
                                            src={require(`../Main/img/ingredients/${categories.img}`)}

                                            alt=""
                                            className={main.images_small}
                                        /> </td>
                                <td>{categories.name} </td>
                                <td>{categories.price} </td>
                                <td>{categories.discount} </td>
                                <td>{categories.description} </td>
                                <td>{categories.categories_id} </td>
                                <td>

                                    <button className={admin.btnnewblue}
                                            onClick={() => window.location.href = `/restaraunt/product/${categories.id}`}> View
                                    </button>
                                    <button className={admin.btnnewgreen}
                                            onClick={() => window.location.href = `/restaraunt/edit/product/${categories.id}`}>Edit
                                    </button>
                                    <button onClick={() => handleDelete(categories.id)} className={admin.btnnewred}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>

        </body>


    );
};


export default RestarauntProduct;