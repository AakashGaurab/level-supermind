import React,{useEffect,useState} from 'react'
import Navbar from '../../component/Navbar'
import Swal from 'sweetalert2';
import style from "./IndPost.module.css";

function IndPost() {
    let id = sessionStorage.getItem("id");
    if (!id){
        window.location.href="/login"
    }

    let [blogs,setBlogs] = useState([]);
    let [flag,setFlag] = useState(0);
  useEffect(()=>{
    get_data();
    async function get_data(){
      try {
        let response = await fetch(`http://65.0.106.33:3500/blogs/${id}`);
        let final_response = await response.json()
        setBlogs(final_response);
      } catch (error) {
        Swal.fire({
          icon:"info",
          title:error
        })
      }
      
    }  
  },[flag])

  let delete_post = async(id)=>{
    try {
        let response = await fetch(`http://65.0.106.33:3500/blogs/${id}`,{
            method:"DELETE"
        })

        let final_response = await response.json();
        if (final_response=="Post Deleted"){
            Swal.fire({
                icon:"success",
                title:final_response
            })
        setFlag(flag+1)
        }
        else {

        }
    } catch (error) {
        Swal.fire({
            icon:"error",
            title:"Error"
        })
    }
  }

  return (
    <>
    <Navbar/>
    
    <div className='container'>
      {blogs.map((element) => (
        <div className="card mt-5" key={element.id}>
        <div className="card-body">
          <h5 className="card-title">Title: {element.title}</h5>
          <p>Author: {element.name}</p>
          <h6 className="card-subtitle mb-2 text-body-secondary">{new Date(element.createdAt).getFullYear()+"/"+new Date(element.createdAt).getMonth()+"/"+new Date(element.createdAt).getDate()+"   "+new Date(element.createdAt).getHours()+":"+new Date(element.createdAt).getMinutes()}</h6>
          <p className="card-text">{element.content}</p>
        </div>
        <button type="button" className="btn btn-danger" id={style.delete_button} onClick={()=>{delete_post(element.id)}}>Delete</button>
      </div>
      ))}
    </div>

    </>
  )
}

export default IndPost