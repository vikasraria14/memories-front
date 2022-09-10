import {createSlice} from '@reduxjs/toolkit'
import { getPosts,likePost,deletePost } from '../Controllers/login';
const initialState=null;
const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        getAllPosts(state,action)
        {
            const posts=action.payload;
            return posts;
        },
        increaseLike(state,action)
        {
            const posts=action.payload;
            const allPosts=state;
            
            const allPosts1=allPosts.map(post=>{
               
                return posts._id===post._id?posts:post
            });
            return allPosts1
        },
        deleteMemory1(state,action)
        {
            return action.payload
        }
    }
})


export const getAllThePosts=(data)=>{
    return async dispatch=>{
        const res=await getPosts(data);
        dispatch(getAllPosts(res))
    }
}
export const deleteMemory=(id,token)=>{
    return async dispatch=>{
        const res=await deletePost(id,token);
        console.log("Response after delete",res)
        dispatch(deleteMemory1(res))
    }
}
export const updateLike=(id)=>{
    return async dispatch=>{
        const res= await likePost(id);
        console.log("\n\n\n\n\n",res)
        dispatch(increaseLike(res))
    }
}

const {getAllPosts,increaseLike,deleteMemory1}= postSlice.actions;
export default postSlice.reducer