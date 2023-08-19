import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useStoreState,useStoreActions } from 'easy-peasy';

const EditPost = () => {
    const history = useNavigate()
    const { id } = useParams()


    const editTitle = useStoreState((state) => state.editTitle)
    const editBody = useStoreState((state) => state.editBody)

    const editPost = useStoreActions((actions) => actions.editPost)
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const setEditBody = useStoreActions((actions) => actions.setEditBody)


    const getPostById = useStoreState((state) => state.getPostById)
    const post = getPostById(id)

    const handleEdit = (id) => {
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp')
        const updatedPost = { id, title: editTitle, dateTime, body: editBody }
        editPost(updatedPost)
        history(`/post/${id}`)
    }

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
                        <button type='button' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
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