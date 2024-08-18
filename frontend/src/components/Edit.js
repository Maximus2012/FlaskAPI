import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';

const Edit = () => {
    const {user_id}=useParams()
    const navigate = useNavigate();
    const clickToBackHandler=()=>{
        navigate('/users');
    }

    const [userField, setUserField] = useState({
        email: "",
        name: "",
        password: ""
    });

    useEffect(()=>{
        fetchUser();
    },[user_id])

    const fetchUser=async()=>{
        try{
            const result=await axios.patch("http://127.0.0.1:25000/users/"+user_id);
            // console.log(result.data);
            setUserField(result.data)
        }catch(err){
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
            await axios.patch("http://127.0.0.1:25000/users/"+user_id, userField);
            navigate('/users');
        } catch (err) {
            console.log("Something Wrong");
        }
    }

    return (
        <div className="wrapper">
      <div className="title"><span>Change Form</span></div>
        <form action="#" method="patch" id="loginform">
        <div className="row">
          <i className="fas fa-user"></i>
          <input name ="email" type="text" placeholder="Email" required onChange={e => changeUserFieldHandler(e)}  />
        </div>
            <div className="row">
          <i className="fas fa-user"></i>
          <input name ="name" type="text" placeholder="Name" required onChange={e => changeUserFieldHandler(e)} />
        </div>
        <div className="row">
          <i className="fas fa-lock"></i>
          <input name ="password" type="password" placeholder="Password" required onChange={e => changeUserFieldHandler(e)}  />
        </div>

        <div className="row button">
          <input type="submit" value="Change data" onClick={e => onSubmitChange(e)} />
        </div>


      </form>
  <div className='aling-center'><button className='btn-center btn-new-green' onClick={clickToBackHandler}>Back To Home</button></div>
        </div>
    )
};


export default Edit;