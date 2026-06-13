import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    enrollmentNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    completedModules: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    certificateAvailable: {
      type: Boolean,
      default: false,
    },
    certificateNo: {
      type: String,
      trim: true,
      default: '',
    },
    certificateIssuedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);
