import React,{useEffect,useState} from 'react'
import Navbar from '../../component/Navbar'
import Swal from 'sweetalert2';
import style from "./Home.module.css"

function Home() {
  let id = sessionStorage.getItem("id");
  if (!id){
    window.location.href="/login";
  }


  /* ******************************* fetching for Creating Blogs ********************************************** */

  let [flag,setFlag] = useState(1)
  
  let create_blog= (e)=>{
    e.preventDefault();
    let obj = {};
    obj.title = document.querySelector("#exampleFormControlInput1").value;
    document.querySelector("#exampleFormControlInput1").value = "";
    obj.content = document.querySelector("#exampleFormControlTextarea1").value;
    document.querySelector("#exampleFormControlTextarea1").value = "";
    create(obj);
    //console.log(id)
  }

  async function create(data){
     try {
      let response = await fetch(`http://localhost:3500/blogs/${id}`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(data)
      })

      let final_response = await response.json();
      if (final_response=="Post Created"){
        Swal.fire({
          icon:"success",
          title:final_response
        })
        setFlag(flag+1);
      }
      else {
        Swal.fire({
          icon:"error",
          title:final_response
        })
        console.log(final_response)
      }
     } catch (error) {
      Swal.fire({
        icon:"error",
        title:error
      })
     }
  }
  /* ******************************Fetching all blogs******************************** */
  let [blogs,setBlogs] = useState([]);
  useEffect(()=>{
    get_data();
    async function get_data(){
      try {
        let response = await fetch("http://localhost:3500/blogs");
        let final_response = await response.json()
        console.log(final_response);
        setBlogs(final_response);
      } catch (error) {
        Swal.fire({
          icon:"info",
          title:error
        })
      }
      
    }  
  },[flag])

/* *****************************************fetching comments************************************ */
  let [comment,setComment] = useState([]);          
  let [blogid,setBlogid] = useState();
  let get_comment=async(id)=>{                         //getting all comments related to particular blog
    setBlogid(id); 
    try {
      let response = await fetch(`http://localhost:3500/comment/${id}`);
      let final_response = await response.json();
      setComment(final_response); 
    } catch (error) {
      Swal.fire({
        icon:"info",
        title:"Error"
      })
    }
  }

  let create_comment=async(e)=>{                          // getting comment from form 
    e.preventDefault();
    let obj = {};
    obj.content = document.querySelector("#exampleInputPassword1").value;
    document.querySelector("#exampleInputPassword1").value = "";
    post_comment(obj)
    //console.log(obj)
  }

  async function post_comment(data){                         //posting comment to backend
    try {
      let response = await fetch(`http://localhost:3500/comment/${id}/${blogid}`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
      
      let final_response = await response.json();
      if (final_response=="Comment added"){
        get_comment(blogid);
      }
      else{
        console.log(final_response)
        Swal.fire({
          icon:"error",
          title:"Error"
        })
      }
    } catch (error) {
      Swal.fire({
        icon:"error",
        title:error
      })
    }
  }

  return (
    <>
    <Navbar/>

    {/* *****************************************Blog Creation************************************* */}
    <div className={style.upper_button}>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Blog</button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create Blog</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className="row g-3 needs-validation">

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="ex. My First Blog"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{width:"fit-content"}} onClick={create_blog}>Create</button>
            </form>


            </div>
          </div>
        </div>
      </div>
    </div>

   {/* ***********************************************comment section************************************* */}
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Comments</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
      <form className="row g-3 needs-validation d-flex" >
        <input type="text" className="form-control" id="exampleInputPassword1" placeholder='comment'/>
        <button type="submit" className="btn btn-success" style={{width:"fit-content"}} onClick={create_comment}>Post</button>
      </form>
        
        {comment.length!==0 ?<div className="container"> {comment.map((element)=>{
          return <div className="card" key = {element.id} style={{margin:"5% auto 5% auto"}} ><div className="card-body"><p className={style.comment_name}>{element.name}</p><p>{element.content}</p><p className={style.comment_date}>{new Date(element.createdAt).getFullYear()+"/"+new Date(element.createdAt).getMonth()+"/"+new Date(element.createdAt).getDate()+"   "+new Date(element.createdAt).getHours()+":"+new Date(element.createdAt).getMinutes()}</p></div></div>
        })} </div>:"No Comments"}        
      </div>
    </div>
    
    {/* *****************************************Rendering Blogs********************************************* */}
    <div className='container'>
      {blogs.map((element) => (
        <div className="card mb-3" key={element.id}>
        <div className="card-body">
          <h5 className="card-title">Title: {element.title}</h5>
          <p>Author: {element.name}</p>
          <h6 className="card-subtitle mb-2 text-body-secondary">{new Date(element.createdAt).getFullYear()+"/"+new Date(element.createdAt).getMonth()+"/"+new Date(element.createdAt).getDate()+"   "+new Date(element.createdAt).getHours()+":"+new Date(element.createdAt).getMinutes()}</h6>
          <p className="card-text">{element.content}</p>
        </div>
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{width:"fit-content",margin:"1%"}} onClick={()=>{get_comment(element.id)}}>Comments</button>
      </div>
      ))}
    </div>
    </>
    
  )
}

export default Home