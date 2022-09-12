import { useSelector, useDispatch } from 'react-redux'
import PostCard from "./PostCard";
import { useEffect } from 'react';
import { getAllThePosts } from '../../Reducers/postReducer';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
const Post = () => {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const navigate=useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    
    if (!loggedInUser) {
      
      navigate('/login')
    }
    else {
      const token = (loggedInUser).token
      dispatch(getAllThePosts(token))
    }

  }, [loggedInUser,dispatch,navigate])

  

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
