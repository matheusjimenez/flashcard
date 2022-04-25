import { useEffect, useState, useRef } from 'react';
import { FlashcardList } from './components/FlashcardList';
import { getOptionsList, getQuestionsList } from './infra/QuestionListResponse';
import { IFlashcard } from './interface/IFlashcard';
import './styles/global.css';

function App() {
  const [flashcards, setFlashcards] = useState([] as IFlashcard[]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountRef = useRef();

  useEffect(()=>{
    const fetchData = async ()=>{
      setCategories(await getOptionsList());
    }

    try{
      fetchData();
    }catch(err){
      throw new Error(err);
    }
  },[])

  const fetchData = async ()=>{
    setFlashcards(await getQuestionsList(amountRef.current.value,categoryEl.current.value));
  }
  
  useEffect(() => {
    try{
      fetchData();
    }catch(err){
      throw new Error(err);
    }
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    try{
      fetchData();
    }catch(err){
      throw new Error(err);
    }
  }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' ref={categoryEl}>
            {
              categories.map((category, index)=>{
              return <option value={category.id} key={category.id}>{category.name}</option>
              })
            }
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'> Number of questions</label>
          <input type={'number'} id='amount' min={1} step={1} defaultValue={10} ref={amountRef}></input>
        </div>
        <div className='btn' onClick={handleSubmit}>Generate</div>
      </form>
      <div className='container'>
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App
