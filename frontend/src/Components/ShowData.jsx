import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
  return (
    <div className='container'>
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
                </div>
            </div>
            </div>
        ))
        }
      </div>
    </div>
  )
}
