import mongoose from 'mongoose';
import castErrorMessage from './errors/castErrorMessage.js'
import GenericError from './errors/GenericError.js'
import validationErrorMessage from './errors/validationErrorMessage.js'

export default (err) => {
  if (err instanceof GenericError) {
    throw err;
  } else {
    if (err instanceof mongoose.Error.ValidationError) {
      const message = validationErrorMessage(err);
      throw new GenericError(message, 400);
    } else if (err instanceof mongoose.Error.CastError) {
      const message = castErrorMessage(err);
      throw new GenericError(message, 400);
    }
    console.error(err);
    throw new GenericError('Erro interno do servidor', 500);
  }
};
