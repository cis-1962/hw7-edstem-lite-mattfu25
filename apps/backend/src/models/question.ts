import mongoose, { Schema } from 'mongoose';

interface IQuestion {
    questionText: string;
    answer: string;
    author: string;
}

const schema = new Schema<IQuestion>({
    questionText: { type: String, required: true },
    answer: { type: String, required: false },
    author: { type: String, required: true },
});

const Question = mongoose.model('Question', schema);

export default Question;