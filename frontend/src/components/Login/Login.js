import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const host="http://localhost:5000";
const Login = () => {
    const nav = useNavigate();
   
   
   
    const [data, setdata] = useState({email:"",password:""})
    const onChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
        console.log(data)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        // setcredentials({ email: "", password: "" });
        try{
            const response=await fetch(`${host}/user/login`,{
                method: "POST",
    
                headers: {
                  "Content-Type": "application/json",
          
                  // 'Accept':'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                  }),
                 
            })
            const json = await response.json();
            console.log(json)
            if (json.success) {
                // localStorage.setItem("token", json.authtoken);
          
          
                console.log("signed in sucesfully");
                console.log(json.authtoken)
                
                localStorage.setItem("token", json.authtoken)
                nav('/');
                window.location.reload();
                
          
                
              }
        }catch(e){
            console.log(e.message)
        }
       


    }
  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          class="form-control"
          id="exampleInputEmail1"
          onChange={onChange}
     
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          class="form-control"
          id="exampleInputPassword1"
          onChange={onChange}
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;