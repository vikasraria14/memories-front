import axios from 'axios';

const url1="http://192.168.1.8:3001/";
//const url="http://192.168.1.8:3001/login"
export const getAll=async()=>{
    const res=await axios.get(url1)
    return res;
}

export const setLogin=async(data)=>{
    console.log("Hello")
    const url=url1+"login"
    const res=await axios.post(url,data);
    console.log("this is res",res)
    return res.data;
}

export const setSignUp=async(data)=>{
    const url=url1+"signup";
    const res=await axios.post(url,data);
    return res.data;
}

export const getPosts=async(token)=>{
    const url=url1+"posts";
    const res=await axios.get(url,{headers:{'Authorization':`Bearer ${token}`}})
    console.log("res for getPosts ",res)
    return res.data;
}

export const setPosts=async(data,token)=>{
    const url=url1+"posts";
    console.log("set request Sent",token)
    const res=await axios.post(url,data,{headers:{'Authorization':`Bearer ${token}`}})
    console.log("res for setPosts ",res)
    return res.data;
}

export const deletePost=async(id,token)=>{
    console.log("Flow of token", token)
    const url=url1+"posts/delete/"+id;
    const res=await axios.delete(url,{headers:{'Authorization':`Bearer ${token}`}})
    return res.data;
}

export const likePost=async(id)=>{
    const url=url1+"posts/like/"+id;
    console.log(url)
    const res=await axios.patch(url);
    console.log(res.data);
    return res.data;
}

