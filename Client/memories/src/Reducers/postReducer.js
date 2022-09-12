import {createSlice} from '@reduxjs/toolkit'
import { getPosts,likePost,deletePost,setPosts} from '../Controllers/login';
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
            const id=action.payload;
            const x=state.filter(st=>{
                
                return st._id!==id}
                );
            return x
        },
        appendPost(state,action)
        {
            const x=action.payload;
            state.unshift(x);
            
            return state;
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
       
        if(res.data)
        {
            dispatch(deleteMemory1(id))
        }
       // 
    }
}
export const updateLike=(id)=>{
    return async dispatch=>{
        const res= await likePost(id);
      
        dispatch(increaseLike(res))
    }
}

export const addPost=(data,token)=>{
    return async dispatch=>{
        const res= await setPosts(data,token);
        
        dispatch(appendPost(res));
    }
}

const {getAllPosts,increaseLike,deleteMemory1,appendPost}= postSlice.actions;
export default postSlice.reducer