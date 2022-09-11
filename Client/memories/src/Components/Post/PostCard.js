import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { updateLike, deleteMemory } from '../../Reducers/postReducer';
import likeImg from '../Assets/like.png';
import deleteImg from '../Assets/delete.png'
import { useDispatch } from 'react-redux'
import Col from 'react-bootstrap/Col'
const PostCard = ({ post }) => {

  const dispatch = useDispatch();
  const like = (event) => {
    event.preventDefault();
    console.log("Clicked on like")
    const id = event.target.id;
    dispatch(updateLike(id))
    console.log(event.target.id)
  }

  const deletePost = (event) => {
    
    event.preventDefault();
    console.log("Clicked on delete")
    const user = window.localStorage.getItem('loggedInUser')
    const id = event.target.id;
    console.log(id)
    const token = JSON.parse(user).token
    console.log(token)
    dispatch(deleteMemory(id, token))
  }
  return (
    <Col>
      <Card >
        <div className="postUser">
          {post.name}
          <br />
          {moment(post.createdAt).fromNow()}
        </div>
        <Card.Img style={{ width: "150", height: "150px" }} variant="top" src={post.photo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
        <Card.Body>
          <div className='tags'>{post.tags}</div>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>
            {post.message}
          </Card.Text>
          <div className='buttonWrapper'>
          <div className='like' id={post._id} onClick={like}><img id={post._id} onClick={like}  src={likeImg} alt="" className='icon' /> {post.likeCount} LIKE</div>
          <div className='delete' id={post._id} onClick={deletePost}><img id={post._id} onClick={deletePost}   src={deleteImg} alt="" className='icon' /> DELETE</div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PostCard;