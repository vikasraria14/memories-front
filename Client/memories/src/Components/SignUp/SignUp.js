import {
     useNavigate
} from "react-router-dom"
import { setSignUp } from '../../Controllers/login';
import './main.css'
import image1 from './images/img-01.png'
import './Login_v1/fonts/font-awesome-4.7.0/css/font-awesome.min.css'

const SignUp=()=>{
	const navigate = useNavigate()
    const redirect = () => {
        navigate('/Login')
    }
    const signup=async(event)=>{
        event.preventDefault();
        const name=event.target.name.value;
        const username=event.target.username.value;
        const password=event.target.password.value;
        const data={name,username,password};
        console.log(data)
        const res=await setSignUp(data);
        console.log(res);
    }
    return(
        <>
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={image1} alt="IMG"/>
				</div>

				<form onSubmit={signup} className="login100-form validate-form">
					<span className="login100-form-title">
						Sign Up to Create Memories
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="name" placeholder="name"/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						<i class="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="username" placeholder="username"/>
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
							SignUp
						</button>
					</div>

					

					<div className="text-center p-t-136">
						<a onClick={redirect} className="txt2" href="#">
							Already have an account - Login
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
export default SignUp;