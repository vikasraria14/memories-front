import {
    BrowserRouter as Router,
    Routes, Route, Link, useNavigate
} from "react-router-dom"
import './main.css'
import image1 from './images/img-01.png'
import './Login_v1/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import { setLogin } from "../../Controllers/login"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { logInUser } from "../../Reducers/loggedInUserReducer"
const Login=()=>{
    const navigate = useNavigate()
    const redirect = () => {
        navigate('/signup')
    }
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.loggedInUser)

    const login = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const data = { username, password }
        const res = await setLogin(data);
        console.log("Clicked,", res)
        window.localStorage.setItem('loggedInUser', JSON.stringify(res))
        dispatch(logInUser(res))
        console.log("U there?")
        navigate('/')
    }
    return(
        <>
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={image1} alt="IMG"/>
				</div>

				<form onSubmit={login} className="login100-form validate-form">
					<span className="login100-form-title">
						Login to your Memories
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="username" placeholder="Username"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="password" placeholder="Password"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Login
						</button>
					</div>

					

					<div className="text-center p-t-136">
						<a onClick={redirect} className="txt2" href="#">
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
    </>
    )
}
export default Login;