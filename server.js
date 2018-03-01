//Requires
const express = require('express');
const app = express();
const path = require('path');

import "isomorphic-fetch";

//Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/playbyplay/:gameId', (req, res) => {
  let results;
  console.log('hitting backend');
  fetch(`http://stats.nba.com/stats/playbyplayv2/?GameID=${req.params.gameId}&StartPeriod=1&EndPeriod=14`,
    {
      headers:
        {
          "Dnt": "1",
          "Accept-Language": "en",
          "cache-control":"max-age=0",
          "Accept-Encoding": "Accepflate, gzip, deflate, sdch",
          Referer: 'http://stats.nba.com/',
          connection: 'keep-alive',
          host: 'stats.nba.com',
          'accept-language':'he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
          Accept: '*/*',


        }})
    .then(function(response) {
      console.log('responded');
        return response.text();
    }).then(function(body) {
      // console.log(body);
      results = JSON.parse(body);
        // console.log(typeof body);
        // console.log(body.length);
        // console.log(JSON.parse(body));
        res.send(results);
    });

});

// http://data.nba.net/10s/prod/v1/20180212/scoreboard.json

app.get('/api/games/:date', (req, res) => {
  let results;


  fetch(`http://data.nba.net/10s/prod/v1/2018${req.params.date}/scoreboard.json`)
    .then(function(response) {

        return response.text();
    }).then(function(body) {
      // console.log(body);
      results = JSON.parse(body);
        // console.log(typeof body);
        // console.log(body.length);
        // console.log(JSON.parse(body));

        res.send(results);
    });

});


const port = 1337;
//Run Server
app.listen(process.env.PORT || port, () => console.log(`Listening intently on port ${port}`));
