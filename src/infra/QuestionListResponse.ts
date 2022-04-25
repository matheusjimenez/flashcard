import axios from 'axios';
import { IFlashcard } from '../interface/IFlashcard';

let QuestionsList: IFlashcard[];
let OptionList: [];

function decodeString(text: string) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

async function getOptionsList() {
    let data = null;
    await axios.get('https://opentdb.com/api_category.php').then((res) => {
        data = res.data.trivia_categories;
    }).catch(() => {
        throw new Error('no data found');
    });
    return data;
}


async function getQuestionsList(amount, category) {
    await axios.get('https://opentdb.com/api.php',{
        params:{
            amount, 
            category
        }
    }).then(res => {
        QuestionsList = res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
                ...questionItem.incorrect_answers.map(a => decodeString(a)),
                answer
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
    return QuestionsList;
}

export { getQuestionsList, getOptionsList }

