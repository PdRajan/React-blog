import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import React from 'react'

const EditPost = ({ posts, handleEdit, editBody, editTitle, setEditBody, setEditTitle }) => {

    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }

    }, [post, setEditBody, setEditTitle])
    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id='postTitle'
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />

                        <label htmlFor="postBody">Body:</label>
                        <textarea
                            id='postBody'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            { !editTitle && 
            <>
              <h2>Page not Found</h2>
              <p>Well, that's Disappointing</p>
              <p>
                <Link to='/'>Visit Our Homepage</Link>
              </p>
              
            </>
          }
        </main>

    )
}

export default EditPost