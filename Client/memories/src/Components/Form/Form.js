import { useState } from 'react'
import FileBase from 'react-file-base64'
import { setPosts } from '../../Controllers/login'
const Form = () => {
   const [postImage,setPostImage]=useState(null)
   const savePost=(event)=>{
    event.preventDefault();
    const title=event.target.title.value;
    const message=event.target.message.value;
    const photo=postImage;
    if(!title||!message||!postImage)
    {
        console.log("All Fields Required")
    }
    else
    {
        const user=window.localStorage.getItem('loggedInUser')
        const token=JSON.parse(user).token
        const data={title,message,photo}
        console.log(token)
        setPosts(data,token)

    }
   }
    return (
        <div>
            <form onSubmit={savePost}>
                <input name='title' placeholder="title" />
                <br/><br/>
                <input name='message' placeholder="message" />
                <br/><br/>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostImage( base64 )} />
                <br/><br/>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default Form