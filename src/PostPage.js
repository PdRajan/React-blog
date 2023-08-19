import { useStoreState, useStoreActions } from 'easy-peasy'
import { useParams,Link, useNavigate } from 'react-router-dom'


const PostPage = () => {

  const deletePost = useStoreActions((actions) => actions.deletePost)
  const getPostById = useStoreState((state) => state.getPostById)
  const {id} = useParams()
  const post = getPostById(id)
  const history = useNavigate()

  const handleDelete = (id) => {
    deletePost(id)
    history('/')
}
  return (
    <main className='PostPage'>
        <article className='post'>
          { post && 
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.dateTime}</p>
              <p className="postBody">{post.body}</p>
              <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
              <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
            </>
          }
          { !post && 
            <>
              <h2>Page not Found</h2>
              <p>Well, that's Disappointing</p>
              <p>
                <Link to='/'>Visit Our Homepage</Link>
              </p>
              
            </>
          }
          
        </article>
    </main>
  )
}

export default PostPage