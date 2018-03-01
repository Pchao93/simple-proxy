//Requires
const express = require('express');
const app = express();
const path = require('path');


//Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));


const port = 1337;
//Run Server
app.listen(process.env.PORT || port, () => console.log(`Listening intently on port ${port}`));
