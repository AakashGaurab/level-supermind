import React from 'react'
import Navbar from '../../component/Navbar'
import Swal from 'sweetalert2'
import style from './Login.module.css'
import login_gif from './opt1.gif'

function Login() {

    let login = (e)=>{
        e.preventDefault();
        let obj = {};
        obj.email = document.querySelector("#validationCustomUsername").value;
        document.querySelector("#validationCustomUsername").value = "";
        obj.password = document.querySelector("#validationCustom03").value;
        document.querySelector("#validationCustom03").value = "";
        fetch_login(obj);
    }


    async function fetch_login(data){
        try {
            let response = await fetch("http://localhost:3500/user/login",{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify(data),
            })

            let final_response = await response.json();

            if (final_response.msg=="Login Succesfull"){
               Swal.fire({
                icon:"success",
                title:final_response.msg
               })
               sessionStorage.setItem("id",final_response.id)
               window.location.href = "/";

            }
            else {
                Swal.fire({
                    icon:"error",
                    title:final_response
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
    <div className={style.container}>
        <div>
        <h1>Welcome Login To Continue</h1>
        <form className="row g-3 needs-validation">
          <div className="col-md-8">
            <label htmlFor="validationCustomUsername" className="form-label">Username</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">@</span>
              <input type="email" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
              <div className="invalid-feedback">
                Please choose a username.
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <label htmlFor="validationCustom03" className="form-label">Password</label>
            <input type="password" className="form-control" id="validationCustom03" required/>
            <div className="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>
          
          
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit" onClick={login}>Submit form</button>
          </div>
        </form>
        </div>

        
        <div>
        <img src={login_gif} alt="signup_gif" />
      </div>

    </div>
    </>
  )
}

export default Login