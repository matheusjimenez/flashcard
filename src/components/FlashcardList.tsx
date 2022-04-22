import React from 'react'
import { IFlashcard } from '../interface/IFlashcard';
import { Flashcard } from './Flashcard';

type Props = {
    flashcards: IFlashcard[];
}
function FlashcardList({ flashcards, ...rest }: Props) {
    return (
        <div {...rest} className='card-grid'>
            {
                flashcards.map((flashcard, key) => {
                    return <Flashcard flashcard={flashcard} key={flashcard.id} />
                })
            }
        </div>
    );
}
export { FlashcardList }