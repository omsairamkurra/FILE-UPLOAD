// import { useState,useEffect } from 'react'
// import './App.css'
// import axios from 'axios'

// function App() {
//   const [file, setFile] = useState()
//   const [uploadedImage,setUploadedImage] = useState(null)
//   const upload=()=>{
//     const formData=new FormData()
//     formData.append('file',file)
//     axios.post('http://localhost:3000/upload',formData)
//     .then(res=>{console.log(res);
//     setUploadedImage(res.data.path)})
//     .catch(err=>console.log(err))
//   }

//   return (
//     <div style={{backgroundColor:'pink'}}>
//       <div>
//         <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>
//         <button type='button' onClick={upload}>Upload</button>
//       </div>
//       <br/>
//       <div className='container'>
//         <h1>{uploadedImage}</h1>
//         {uploadedImage && (
//         <img src={`http://localhost:3000/uploaded/${uploadedImage}`} alt="image" className='image'/>
//         )}
//       </div>
//     </div>
//   )
// }

// export default App


import  { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImage,setUploadedImage] = useState(null)
  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:3000/upload', formData)
      .then((res) => {
        console.log(res);
        setFile(null);
        loadUploadedImages();
        setUploadedImage(res.data.path)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadUploadedImages = () => {
    axios.get('http://localhost:3000/uploadedImages')
      .then((res) => {
        setUploadedImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadUploadedImages();
  }, []);

  const currentDate = new Date();

  return (
    <div style={{ backgroundColor: 'pink' }}>
      <div className='upload-container'>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="button" onClick={upload}>Upload</button>
      </div>
      <br />
      <div className='container'>
        <h1 style={{color:'green'}}>YOUR UPLOADED PHOTOS</h1>
        <p>Image Name : {uploadedImage}</p>
        <p>Uploaded on: {currentDate.toString()}</p>
        <img src={`http://localhost:3000/uploaded/${uploadedImage}`} alt="image" className='image'/>
        <ol>
          {uploadedImages.map((image, index) => (
            <li key={index}>
              <p>{image}</p>
              <img src={`http://localhost:3000/uploaded/${image}`} alt={`Image ${index}`} className="image" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
