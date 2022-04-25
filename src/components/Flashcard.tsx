import React, { useState, useEffect, useRef } from 'react'
import { IFlashcard } from '../interface/IFlashcard'

type Props = {
  flashcard: IFlashcard
}

function Flashcard({ flashcard, ...rest }: Props) {
  const [flip, setFlip] = useState<boolean>(false);
  const [height, setHeight] = useState<any>('initial');
  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight(){
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight ,[flashcard.answer, flashcard.question, flashcard.options]);
  useEffect(()=>{
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight)
  }, []);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{height: height}}
      {...rest}
      onClick={() => setFlip(!flip)}
    >
      <div className='front' ref={frontEl}>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option, key) => {
            return <div key={`option${key}`} className='flashcard-option'>{option}</div>
          })}
        </div>
      </div>
      <div className='back' ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
}
export { Flashcard }