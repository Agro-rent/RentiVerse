import React,{Fragment, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import Image from "../../assets/logo.png";
import axios from "axios";
import "./Login.css";
import toast from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setFirstName} = useContext(AuthContext);

  if(isLoggedIn){
    toast.error("You are already logged in!");
    navigate('/profile')
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Loading...');
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/api/user/login', input); 
      if (response.status === 200) {
        setFirstName(response.data.firstName);
        setIsLoggedIn(true);
        toast.success("Login successful", {
          id: toastId,
        });
        navigate('/'); 
      }
    } catch (error) {
      if(error.response && error.response.status===400){
        toast.error("Invalid credentials", {
          id: toastId,
        });
      }
      else{
        toast.error("There was an error", {
          id: toastId,
        });
      }
      console.log(error);
      
    }
  };

  const handleRegisterRedirect = () => {
      navigate('/verify');
  };
  const [input, setInput] = useState({
    email: '',
    password: ''
  }
  );

  const submissionHandler = (event) => {
    event.preventDefault();
  };


  return (
    <div className="fragment">
    <div className="container-login">
      <img src={Image} alt="Logo" className="logo-login" onClick={()=>navigate('/')}/>
      <div className="card-main-login" onSubmit={submissionHandler}>
        <div className="card-content-login">
          <h2>Login</h2>
          <form method="POST" onSubmit={handleLogin}>
            <div className="form-group-login-page">
              <input type="text" className="form-control-login-page" placeholder="Email" required autoComplete="on" onChange={(e)=>setInput({ ...input, email: e.target.value })}/>
            </div>
            <div className="form-group-login-page">
              <input
                type="password"
                className="form-control-login-page"
                placeholder="Password"
                autoComplete="current-password"
                required
                onChange={(e)=>setInput({ ...input, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary button-login">
              Login
            </button>
            <div className="register-here-div">
              <span className="register-here-span" onClick={handleRegisterRedirect}>or register here.</span>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
