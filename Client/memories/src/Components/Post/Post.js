import { useSelector, useDispatch } from 'react-redux'
import PostCard from "./PostCard";
import { useEffect } from 'react';
import { getAllThePosts } from '../../Reducers/postReducer';
import Row from 'react-bootstrap/Row';
const Post = () => {
  const loggedInUser = useSelector(state => state.loggedInUser)
  
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

  }, [loggedInUser,dispatch])

  

  let posts = useSelector(state => state.posts)
  if (posts) {
    
    return (
      <div className="PostWrapper">
        
        <Row xs={1} md={2} className="g-4">
          {
            
          posts.map(post => {
            
            return <PostCard key={post._id} post={post} />
          })}
        </Row>
      </div>
    );
  }

};
export default Post;
