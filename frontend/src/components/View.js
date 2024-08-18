import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, NavLink} from 'react-router-dom';

const View = () => {
    const {user_id}=useParams();
    // console.log(id);
    const[user,setUser]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchUser();
    },[user_id]);

    const fetchUser=async()=>{
        try{
        const result=await axios.get("http://127.0.0.1:25000/users/" + user_id);
        console.log(result.data);
        setUser(result.data)

        }catch(err){
            console.log("Something Wrong");
        }
    }

    const clickToBackHandler=()=>{
        navigate('/users');
    }

    return <body className="body">
        <div className="container">
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Emale</th>
				<th>Name</th>
			</tr>
		</thead>
		<tbody>
         {

                            <tr >
                                <td>{user.id}</td>
                                <td>{user.email} </td>
                                <td>{user.name} </td>
                            </tr>


                }

		</tbody>

	</table>
            <div className='aling-center'><button className='btn-center btn-new-green' onClick={clickToBackHandler}>Back To Home</button></div>

</div>

</body>

};

export default View;