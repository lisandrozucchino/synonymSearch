import React, { useState } from 'react'
import './App.css'

function App() {
  
  type Synonym ={
    word: string;
    score: number;
  }
  //una buena idea para guardar una URL -en este caso no es larga, pero hay momentos en los que es un choclazo-
  const BASE_URL = `https://api.datamuse.com/`


  //seteo el uso de estados para ir manejando los cambios en la página.
    const [word, setWord] = useState("") //el estado INICIAL es un string vacío.
    const [synonyms, setSynonyms] = useState<Synonym[]>([]) //el estado INICIAL es un array de synonyms vacío.
  

  const fetchSynonyms = (word: string) => {
    fetch(`${BASE_URL}words?rel_syn=${word}`)
    .then(response => response.json()) //convierte la respuesta en un json.
    .then(setSynonyms) //guarda la respuesta (como json) en el estado setSynonyms.
  }

    //hay que darle una función al botón, indicarle que utilice la palabra que se indió para ir a buscar el sinónimo.
    const handleFetchSynonyms = (e : React.FormEvent) => {
      e.preventDefault();
      fetchSynonyms(word)
    }
    //importante entender que el tag "htmlFor" es para accesibilidad. Cuando se hace click en el label, busca los elementos con ese id.
  
    //esta función controlará el click en cualquier sinónimo de la palabra indicada y lo usará para buscar sinónimos de él
    const handleSynonymClicked = (newWord: string) => {
      setWord(newWord)
      fetchSynonyms(newWord)
    }
  
    return <div className='App'>
      <form onSubmit={handleFetchSynonyms}>
        <label htmlFor='word-input'>Tu Palabra</label>
        <input
        value={word}
        onChange={(e) => setWord(e.target.value)} 
        id='word-input'>
        </input>
        <button>Sinónimo</button>
  
      </form>
      
      <ul>
        {synonyms.map((synonym) =>(
          <li
          onClick={() => handleSynonymClicked(synonym.word)} key={synonym.word}
          >{synonym.word}</li>
        )
        )}
      </ul>
    </div>
}
//el asunto acá es acomodar el arreglo de sinónimos (que va a estar lleno de "synonym") y mapearlo para poder utilizarlo


export default App
