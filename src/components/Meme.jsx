import React from 'react'

const Meme = () => {
    const [meme, setMeme] = React.useState({
      topText: "",
      bottomText: "",
      customImageFile: null,
      randomImage: "http://i.imgflip.com/1bij.jpg"
    }) 

    const [allMeme, setAllMeme] = React.useState([])

    React.useEffect(() => {
      async function getMemes(){
       const res = await fetch("https://api.imgflip.com/get_memes")
       const data = await res.json()
       setAllMeme(data.data.memes)
      }  
      getMemes()
    }, [])

    function getMemeImage (){
        const randomNumber = Math.floor(Math.random() * allMeme.length)
      const url = allMeme[randomNumber].url 
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }))

    }

    function handleChange(e){
      const {name, value} = e.target
      setMeme(prevMeme=>({
        ...prevMeme,
        [name]: value
      }))
    }

    function handleCustomImageChange(e) {
      const file = e.target.files[0];
      if (file) {
        setMeme({
          ...meme,
          customImageFile: URL.createObjectURL(file),
        });
      } else {
        setMeme({
          ...meme,
          customImageFile: null,
        });
      }
    }

  return (
    <main>
        <div className='form'>
            <input 
            className='form--input' 
            type='text' 
            placeholder='Top text'
            name='topText'
            value={meme.topText}
            onChange={handleChange}
            />
            <input 
            className='form--input' 
            type='text' 
            placeholder='Bottom text'
            name='bottomText'
            value={meme.bottomText}
            onChange={handleChange}
            />
             <input
          className='form--input'
          type="file"
          accept="image/*"
          name='customImage'
          onChange={handleCustomImageChange}
        />
            <button 
            onClick={getMemeImage}
            className='form--button'>
                Get a new meme image 🖼
                </button>
        </div>
        <div className='meme'>
        {meme.customImageFile ? (
          <img src={meme.customImageFile} className='meme--image' alt='Custom Meme' />
        ) : (
          <img src={meme.randomImage} className='meme--image' alt='Random Meme' />
        )}
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
        </div>
    </main>
  )
}

export default Meme