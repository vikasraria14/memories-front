import { setSignUp } from '../../Controllers/login';
import sideimage from '../Assets/img-01.png'
const SignUp=()=>{
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
        <div className='loginWrapper'>
            <div>
                <p>Hello Image</p>
                <img src={sideimage}  alt='No Image'/>
            </div>
            <div>
                <form onSubmit={signup}>
                    <input name='name' placeholder='name'/>
                    <br/><br/>
                    <input name='username' placeholder='username' />
                    <br/><br/>
                    <input name='password' placeholder='password' type={'password'}/>
                    <br/><br/>
                    <button >Sign Up</button>
                </form>
            </div>
        </div>
    )
}
export default SignUp;