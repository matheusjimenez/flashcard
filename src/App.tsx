import { useEffect, useState } from 'react';
import { FlashcardList } from './components/FlashcardList';
import { QuestionsList } from './infra/QuestionListResponse';
import { IFlashcard } from './interface/IFlashcard';
import './styles/global.css';

function App() {
  const [flashcards, setFlashcards] = useState([] as IFlashcard[]);

  useEffect(() => {
    setFlashcards(QuestionsList);
  }, []);

  return (
    <div >
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default App
