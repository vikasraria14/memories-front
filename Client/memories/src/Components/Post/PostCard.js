import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { updateLike,deleteMemory} from '../../Reducers/postReducer';
import likeImg from '../Assets/like.png';
import deleteImg from '../Assets/delete.png'
import {useDispatch} from 'react-redux'

const PostCard=({post})=>{

  const dispatch=useDispatch();
  const like=(event)=>{
    event.preventDefault();
    const id=event.target.id;
    dispatch(updateLike(id))
    console.log(event.target.id)
  }

  const deletePost=(event)=>{
    event.preventDefault();
    const user=window.localStorage.getItem('loggedInUser')
    const id=event.target.id;
    const token=JSON.parse(user).token
    console.log(token)
    dispatch(deleteMemory(id,token))
  }
  return (
    <div className='card'>
      <Card >
        <div>
          {post.name}
          <br/>
          {moment(post.createdAt).fromNow()}
        </div>
      <Card.Img style={{width:"150", height:"150px"}} variant="top" src={post.photo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
      <Card.Body>
      <div>{post.tags}</div>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.message}
        </Card.Text>
        <div><img id={post._id} onClick={like} src={likeImg} alt="" className='icon'/> {post.likeCount} Likes</div>
        <div><img id={post._id} onClick={deletePost} src={deleteImg} alt="" className='icon'/> delete</div>
      </Card.Body>
    </Card>
    </div>
  );
}

export default PostCard;