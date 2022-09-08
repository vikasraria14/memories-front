import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { likePost } from '../../Controllers/login';
import likeImg from '../Assets/like.png';

const PostCard=({post})=>{
  const like=(event)=>{
    event.preventDefault();
    const id=event.target.id;
    likePost(id)
    console.log(event.target.id)
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
      </Card.Body>
    </Card>
    </div>
  );
}

export default PostCard;