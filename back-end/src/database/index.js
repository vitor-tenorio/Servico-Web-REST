import mongoose from 'mongoose';

// mongoose.connect('mongodb://localhost/servico-web-rest', {
mongoose.connect('mongodb://vitor:Vit%40r2001@localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

export default mongoose;
