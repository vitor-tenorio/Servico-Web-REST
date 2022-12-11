import mongoose from '../../database/index.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

TaskSchema.plugin(mongoosePaginate);

export default mongoose.model('Task', TaskSchema);
