import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css"


export default function ShowData() {
    let [user_data, setUser_data] = useState([]);
    
    useEffect(()=>{
        get_data();
    }, [])

    async function get_data() {
        
            await axios.get("http://localhost:7062/ammar/get").then((abc)=> {
            console.log(abc.data);
            setUser_data(abc.data);
        }).
        catch((e)=> {
            console.log(e)
        })
    }

    async function delete_data(id) {
        try {
            if (window.confirm("Are You Sure You Want To Delete This User")) {
                await axios.delete(`http://localhost:7062/ammar/del/${id}`).then(()=> {
                    get_data();
                    toast.info("This User's Data Has Been Deleted Successfully")
                })
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }
  return (
    <div className='container'>
        <ToastContainer />
      <br />
      <hr />
      <h1>User Data</h1>
      <hr />
      <div className="row">
        {(user_data.length === 0 ) ? (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className='card-title text-danger'></h4>
                    </div>
                </div>
            </div>
        ): user_data.map((a) => (
            <div className="col-md-3 mt-3" key={a.id}>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">{a.name}</h4>
                    <p class="card-text">{a.email}</p>
                    <button className="btn btn-outline-success">
                    <i class="bi bi-pencil-square"></i>
                    </button> &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-outline-danger" onClick={()=> {delete_data(a._id)}}>
                    <i class="bi bi-trash3-fill"></i>
                    </button> 
                </div>
            </div>
            </div>
        ))
        }
      </div>
    </div>
  )
}
