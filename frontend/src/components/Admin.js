import React, {useState, useEffect} from 'react';
import axios from 'axios'
import admin from "../styles/admin.module.css";

const Admin = () => {
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
                    url: 'http://127.0.0.1:25000/users/role',
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
            url: 'http://127.0.0.1:25000/users/' + id,
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
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Password</th>
                    <th>Role_ID</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    userData.map((user, i) => {
                        return (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.email} </td>
                                <td>{user.name} </td>
                                <td>{user.password} </td>
                                <td>{user.role_id} </td>
                                <td>

                                    <button className={admin.btnnewblue}
                                            onClick={() => window.location.href = `/users/${user.id}`}> View
                                    </button>
                                    <button className={admin.btnnewgreen}
                                            onClick={() => window.location.href = `/users/patch/${user.id}`}>Edit
                                    </button>
                                    <button onClick={() => handleDelete(user.id)} className={admin.btnnewred}>Delete
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


export default Admin;