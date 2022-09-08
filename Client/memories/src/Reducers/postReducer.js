import {createSlice} from '@reduxjs/toolkit'
import { getPosts } from '../Controllers/login';
const initialState=null;
const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        getAllPosts(state,action)
        {
            const user=action.payload;
            return user;
        }
    }
})


export const getAllThePosts=(data)=>{
    return async dispatch=>{
        const res=await getPosts(data);
        dispatch(getAllPosts(res))
    }
}

const {getAllPosts}= postSlice.actions;
export default postSlice.reducer