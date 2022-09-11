import Post from "../Post/Post";
import Form from "../Form/Form";
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../Reducers/loggedInUserReducer';
import { useDispatch } from "react-redux";
const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const logOut = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('loggedInUser')
        
        dispatch(logOutUser())
        navigate('/login')
    }
    return (
        <>

            <div className="mainWrapper">
                <div className="headWrapper">
                    <h1> welcome to the memories </h1>
                    <button className="logOut" onClick={logOut}>Log Out</button>
                </div>
                
                <div className="mainWrapper1">
                    <Post />
                    <Form />
                </div>
            </div>
        </>
    )
}
export default Main;