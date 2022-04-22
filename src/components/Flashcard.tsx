import React, { useState, useEffect } from 'react'
import { IFlashcard } from '../interface/IFlashcard'

type Props = {
  flashcard: IFlashcard
}

function Flashcard({ flashcard, ...rest }: Props) {
  const [flip, setFlip] = useState<boolean>(false);
  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      {...rest}
      onClick={() => setFlip(!flip)}
    >
      <div className='front'>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option, key) => {
            return <div key={`option${key}`} className='flashcard-option'>{option}</div>
          })}
        </div>
      </div>
      <div className='back'>
        {flashcard.answer}
      </div>
    </div>
  );
}
export { Flashcard }