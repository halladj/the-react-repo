import express from 'express';
import devBundle from './devBundle';
import path from 'path';
import mongoose from 'mongoose';
import template from './../template';


//DECLARING SOME USEFULL CONSTENTS
const CURRENT_WORKING_DIR = process.cwd();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';
const port = process.env.PORT || 3000


//CREATING THE APP INSTENCE AND MAKING THE DATABASE CONNECTING
mongoose.connect(url, {useNewUrlParser: true});
const app = express();

devBundle.compile(app);
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
   res.status(200).send(template())
});

app.listen(port, function onStart(err) {
 if (err) {
  console.log(err) 
 }
 console.info('Server started on port %s.', port)
})