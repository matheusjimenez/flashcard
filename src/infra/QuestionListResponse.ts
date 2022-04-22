import axios from 'axios';
import { IFlashcard } from '../interface/IFlashcard';

let QuestionsList: IFlashcard[];

function decodeString(text: string) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

await axios.get('https://opentdb.com/api.php?amount=10').then(res => {
    QuestionsList = res.data.results.map((questionItem, index) => {
        const answer = questionItem.correct_answer;
        const options = [
            ...questionItem.incorrect_answers, answer
        ]
        return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer,
            options: options.sort(() => Math.random() - .5)
        }
    });
}).catch(err => {
    throw new Error(err);
});

export { QuestionsList }

