import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import { Route, Routes } from 'react-router-dom';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import { action, useStoreActions } from 'easy-peasy';

function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
      setPosts(data)
  }, [data,setPosts])

  return (
    <div className="App">

      <Header title="ReactJs Blog" />



        <Nav />

        <Routes>
          <Route exact path='/' element={<Home fetchError={fetchError} isLoading={isLoading} />} />
          <Route exact path='/post' element={<NewPost />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route exact path='/post/:id' element={<PostPage />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>


      <Footer />
    </div>
  );
}

export default App;
