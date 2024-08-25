import React, {useState, useEffect} from 'react';
import axios from 'axios'
import admin from "../styles/admin.module.css";
import main from "../styles/Main.module.css";
import login from "../styles/Login.module.css";
const RestarauntCategory = () => {
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
                    url: 'http://127.0.0.1:25000/category/type',
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        Role: role
                    }
                })
            ;

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
            url: 'http://127.0.0.1:25000/category/type/' + id,
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
             <div>
            <button className={`${login.btncenter} ${login.btnnewgreen}  ${admin.alingCenter}`}
                                            onClick={() => window.location.href = `/restaraunt/add/category`}>Add category
                                    </button>
            <button className={`${login.btncenter} ${login.btnnewgreen}  ${admin.alingCenter}`}
                                            onClick={() => window.location.href = `/restaraunt/product`}>Product
                                    </button>
        </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Type</th>
                    <th>Action</th>

                </tr>
                </thead>
                <tbody>
                {
                    userData.map((categories, i) => {
                        return (
                            <tr>
                                <td>{categories.id}</td>
                                <td>{categories.category_type} </td>


                                <td>

                                    <button className={admin.btnnewblue}
                                            onClick={() => window.location.href = `/restaraunt/category/${categories.id}`}> View
                                    </button>
                                    <button className={admin.btnnewgreen}
                                            onClick={() => window.location.href = `/restaraunt/edit/${categories.id}`}>Edit
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


export default RestarauntCategory;