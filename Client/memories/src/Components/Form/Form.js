import { useState } from 'react'
import FileBase from 'react-file-base64'
import { addPost } from '../../Reducers/postReducer'
import { useDispatch } from 'react-redux'

const Form = () => {
    const dispatch=useDispatch();

    const [title,setTitle]=useState('')
    const [message,setMessage]=useState('')
    const [tags,setTags]=useState('')
   const [postImage,setPostImage]=useState(null)
   const [errorMessage,setErrorMessage]=useState('')

   const savePost=(event)=>{
    event.preventDefault();
    
    if(!title||!message||!postImage)
    {
        setErrorMessage("All Fields are required")
        console.log("All Fields Required")
        setTimeout(()=>{
            setErrorMessage('')
        },5000)
    }
    else
    {
        
        const user=window.localStorage.getItem('loggedInUser')
        const token=JSON.parse(user).token
        const photo=postImage;
        const data={title,message,tags,photo}
        setMessage('')
        setTitle('')
        setTags('')
        
        
        dispatch(addPost(data,token))

    }
   }
    return (
        <div className='formWrapper'>
            <form onSubmit={savePost}>
                <h3>Create a Memory</h3>
                <input className="inputs" value={title} onChange={(event)=>{setTitle(event.target.value)}} name='title' placeholder="title" />
                
                <textarea rows="4" value={message} onChange={(event)=>{setMessage(event.target.value)}} className="inputs" name='message' placeholder="message"></textarea>
               
                <input className="inputs inputs1" value={tags} onChange={(event)=>{setTags(event.target.value)}} name='tags' placeholder='tags' />
                <br></br>
                <div >
                 <FileBase type="file" value={postImage} multiple={false} onDone={({ base64 }) => setPostImage( base64 )} />
                 </div>
                 <div className='error'>
                    {errorMessage}
                 </div>
                <button className="inputs button1">Submit</button>
            </form>
        </div>
    )
}
export default Form