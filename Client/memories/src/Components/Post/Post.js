import { useSelector, useDispatch } from 'react-redux'
import PostCard from "./PostCard";
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../Reducers/loggedInUserReducer';
import { useEffect } from 'react';
import { getAllThePosts } from '../../Reducers/postReducer';
const Post = () => {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log("loggedInUser",!loggedInUser ,loggedInUser)
    if (!loggedInUser) {
      console.log("navigated")
      //navigate('/login')
    }
    else {
      const token = (loggedInUser).token
      dispatch(getAllThePosts(token))
    }

  }, [loggedInUser])

  const logOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser')
    console.log("NANANANAA")
    dispatch(logOutUser())
    navigate('/login')
  }

  const posts = useSelector(state => state.posts)
  if (posts) {
    return (
      <div>
        <button onClick={logOut}>Log Out</button>
        <div className="PostWrapper">
          {
            
          posts.map(post => {
            { console.log(post) }
            return <PostCard key={post._id} post={post} />
          })}
        </div>
      </div>
    );
  }

};
export default Post;
