require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const command = process.argv[2];
const nodeArgs= process.argv;
var input= [];

for( let i=3; i< nodeArgs.length; i++){
    input.push(nodeArgs[i]);
}


function concert() {
    
    console.log('working on concert');
    const concURL = 'https://rest.bandsintown.com/artists/'+input.slice(',').join('%20')+'/events?app_id=codingbootcamp';
    axios.get(concURL).then(response => {
        for(let i=0; i<3; i++){
            console.log('\n\n' + response.data[i].venue.name)
            console.log(response.data[i].venue.city + ", "+response.data[i].venue.region + ' '+ response.data[i].venue.country)
            console.log(response.data[i].datetime)
            console.log(response.data[i].lineup)
            console.log('---------------------------------------------------------------------------\n\n')
        }

    }).catch(err =>{
        console.log(err);
    });
};
function music(){
    if(input==[]){
        input=['the', 'sign']
    }
    spotify.search({ type: 'track', query: input.slice(', ').join(' ') })
    .then(function(response) {
      console.log('\n\n'+response.tracks.items[0].name);
      console.log(response.tracks.items[0].uri);
      console.log(response.tracks.items[0].album.artists[0].name);
      console.log('----------------------------------------------------------------------\n\n')
    })
    .catch(function(err) {
      console.log(err);
    });
};
function movie(){
    if(input==[]){
        input= ['mr', 'nobody'];
    }
    const url = 'http://www.omdbapi.com/?t='+ input.slice(',').join('+')+ "&y=&plot=short&apikey=trilogy";
    axios.get(url)
    .then(response =>{
        console.log('\n\nTitle: '+ response.data.Title);
        console.log('\nYear: '+ response.data.Year);
        console.log('\nIMDB Rating: '+ response.data.imdbRating);
        console.log('\nProduced: '+ response.data.Country);
        console.log('\nLanguage: '+ response.data.Language);
        console.log('\nPlot: '+ response.data.Plot);
        console.log('\nActors: '+ response.data.Actors);
        console.log('----------------------------------------------------------------------\n\n')
        input=[];
    }).catch(err =>{
        console.log(err);
    });
    
};
function doWhatItSays(){
    console.log('working on rando');
};

switch(command){
    case 'concert-this':
    concert()
    break;
    case 'spotify-this-song':
    music();
    break;
    case 'movie-this':
    movie()
    break;
    case 'do-what-it-says':
    doWhatItSays();
    break;
    default:
    console.log('Not an appropriate request...try again');
};