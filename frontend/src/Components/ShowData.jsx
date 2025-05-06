import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css"


export default function ShowData() {
    let [user_data, setUser_data] = useState([]);
    let [na, setNa] = useState("");
    let [em, setEm] = useState("");
    let [id, setId] = useState("");
    let [age, setAge] = useState(0);


    
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

    function fetch_data (a,b,c,d) {
        setNa(a)
        setEm(b)
        setAge(c)
        setId(d)
    }

    async function update_data() {
        try {
            await axios.put(`http://localhost:7062/ammar/edit/${id}`, {
                name : na,
                email : em,
                age : age,
            }).then((e)=>{
                get_data();
                toast.success(e.data.msg)
                document.querySelector(".close").click()
            })
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
                    <button className="btn btn-outline-warning">
                    <i class="bi bi-pencil-square" onClick={()=>fetch_data(a.name,a.email,a.age,a._id)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </button> &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-outline-danger" onClick={()=> {delete_data(a._id)}}>
                    <i class="bi bi-trash3-fill"></i>
                    </button> 
                </div>
            </div>
            </div>
        ))
        } 
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Data</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" className='form-control mt-2' value={na} onChange={(e)=> {setNa(e.target.value)}} />
        <input type="text" className='form-control mt-2' value={em} onChange={(e)=> {setEm(e.target.value)}} />
        <input type="text" className='form-control mt-2' value={age} onChange={(e)=> {setAge(e.target.value)}} />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={update_data} >update</button>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}
