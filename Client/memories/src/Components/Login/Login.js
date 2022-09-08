import {
    BrowserRouter as Router,
    Routes, Route, Link, useNavigate
} from "react-router-dom"
import sideimage from '../Assets/img-01.png'
import { setLogin } from "../../Controllers/login"
import { useSelector,useDispatch} from 'react-redux'
import { useEffect } from "react"
import { logInUser } from "../../Reducers/loggedInUserReducer"
const Login = () => {
    const navigate = useNavigate()
    const redirect = () => {
        navigate('/signup')
    }
    const dispatch=useDispatch();
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

    return (

        <div className='loginWrapper'>
            <div>
                <p>Hello Image</p>
                <img src={sideimage} alt='No Image' />
            </div>
            <div>
                <form onSubmit={login}>
                    <input name="username" placeholder='username' />
                    <br /><br />
                    <input name="password" placeholder='password' type={'password'} />
                    <br /><br />
                    <button >Log In</button>

                    <a onClick={redirect}>Sign Up</a>
                </form>
            </div>
        </div>
    )
}
export default Login;