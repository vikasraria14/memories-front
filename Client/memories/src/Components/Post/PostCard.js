import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import im from '../Assets/img-01.png'
const PostCard=({post})=>{
  return (
    <div className='card'>
      <Card >
      <Card.Img variant="top" src={post.photo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.message}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
  );
}

export default PostCard;