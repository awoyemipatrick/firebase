import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Auth } from './components/auth'
import { db, auth, storage } from './config/firebase' // 
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

function App() {
  // function to get the data from database
  const [movieList, setMovieList] = useState([])

  // File upload state
  const [fileUpload, setFileUpload] = useState(null)

  // New Movie State
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  // Update title state
  const [updatedTitle, setUpdatedTitle] = useState('')


  const moviesCollectionRef = collection(db, 'movies')

  const getMovieList = async () => {
    // READ THE DATA LIST
    //SET THE DATA LIST
    try {
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
      setMovieList(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    await deleteDoc(movieDoc)
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    await updateDoc(movieDoc, { title: updatedTitle })
  }

  useEffect(() => {

    getMovieList();
  }, []);

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (err) {
      console.error(err)
    }
  }

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      })
      getMovieList();
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div>
        <h1 className='header'>React Tutorial</h1>
        <div>
          <Auth />

          <div className='movie__list'>
            <h1>Movie List</h1>
            <input className='list p' type="text" placeholder='Movie Title...' onChange={(e) => setNewMovieTitle(e.target.value)} />
            <input className='list p' type="number" placeholder='Release Date...' onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
            <label htmlFor="">Recieved An Oscar</label>
            <input className='list' type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
            <button onClick={onSubmitMovie} className='list__sumbit' >Submit Movie</button>
          </div>
          <div >
            {movieList.map((movie, i) => (
              <div key={i}>
                <h1
                  style={{ color: movie.recievedAnOscar ? 'green' : 'red' }} >
                  {movie.title}
                </h1>
                <p>Date: {movie.releaseDate}</p>
                <button onClick={() => deleteMovie(movie.id)} >Delete movie</button>

                <input placeholder='New title...' onChange={(e) => setUpdatedTitle(e.target.value)} />
                <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
              </div>
            ))}
          </div>


          <div>
            <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
            <button onClick={uploadFile}  >Upload file</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
