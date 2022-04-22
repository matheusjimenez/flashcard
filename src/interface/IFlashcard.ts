interface IFlashcard{
    id: number;
    question: string;
    answer: string;
    options: Array<string>;
}

export type { IFlashcard }