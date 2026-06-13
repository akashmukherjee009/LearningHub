import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    answers: {
      type: [answerSchema],
      validate: [
        {
          validator: (answers) => answers.length === 4,
          message: 'Each question must have exactly 4 answers',
        },
        {
          validator: (answers) => (
            answers.filter((answer) => answer.isCorrect).length === 1
          ),
          message: 'Each question must have exactly 1 correct answer',
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: (questions) => questions.length === 10,
        message: 'Each quiz must have exactly 10 questions',
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Quiz', quizSchema);
