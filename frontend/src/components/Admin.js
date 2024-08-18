import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import "../styles/admin.css";
const Admin = () => {
    const [userData, setUSerData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])




    const fetchData = async () => {
        try {
            const token = localStorage.getItem('Authorisation');

            const result = await axios.get("http://127.0.0.1:25000/users");

        // handle success
            //console.  log(result.data);
            setUSerData(result.data)
        } catch (err) {
            console.log("something Wrong");
        }
    }


    const handleDelete=async(id)=>{
        console.log(id);
        await axios.delete("http://127.0.0.1:25000/users/"+id);
        const newUserData=userData.filter((item)=>{
            return(
                item.id !==id
            )
        })
        setUSerData(newUserData);
    }

    return(
        <body className="body">
        <div className="container">
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Email</th>
				<th>Name</th>
				<th>Password</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
         {
                    userData.map((user, i) => {
                        return (
                            <tr >
                                <td>{user.id}</td>
                                <td>{user.name} </td>
                                <td>{user.email} </td>
                                <td>{user.password} </td>
                                <td>

                                    <button className="btn-new-blue" onClick={()=> window.location.href=`/users/${user.id}`}> View</button>
                                    <button className="btn-new-green" onClick={()=> window.location.href= `/users/patch/${user.id}`}>Edit</button>
                                    <button onClick={()=>handleDelete(user.id)} className="btn-new-red  ">Delete</button>
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

export  default Admin;