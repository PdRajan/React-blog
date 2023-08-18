import { useContext } from 'react'
import DataContext from './context/DataContext'
import { useParams,Link, useNavigate } from 'react-router-dom'
import api from './api/posts'

const PostPage = () => {

  const {posts,setPosts} = useContext(DataContext)

  const {id} = useParams()
  const post = posts.find(post => (post.id).toString()=== id)
  const history = useNavigate()

  const handleDelete = async (id) => {
    try {
        await api.delete(`/posts/${id}`)
        const postsList = posts.filter(post => post.id !== id)
        setPosts(postsList)
        history('/')
    } catch (err) {
        console.log(`Error : ${err.message}`)
    }
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