// date time stamp

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var ampm = "";
    m = checkTime(m);

    if (h > 12) {
    	h = h - 12;
    	ampm = " PM";
    } else if (h == 12){
        h = 12;
    	ampm = " AM";
    } else if (h < 12){
        ampm = " AM";
    } else {
        ampm = "PM";
    };
  
  if(h==0) {
    h=12;
  }
    
    document.getElementById('display').innerHTML = h+":"+m+ampm;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function startDate() {
  var d = new Date();
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  document.getElementById("date").innerHTML = days[d.getDay()]+" | "+[d.getMonth()+1]+"/"+d.getDate()+"/"+d.getFullYear();
}


// ayah generator code 

function genQuote() {
  var randNum = Math.floor(Math.random() * 8) + 1;
  document.getElementById('quote').innerHTML = getRandomAyah();
  var tweetQuote = quotes[randNum].split(' ').join('%20');
  tweetQuote = tweetQuote.split('<br>').join('');
  tweetQuote = "https://twitter.com/intent/tweet?text=" + tweetQuote.split('"').join('')
}

// Random Quran Verse by Abdulwahab Humayun

/**
 * Definitions of terms used: 
 * Quran - the Islamic religious book of Islam
 * Surah - chapters of the Quran
 * Ayah - a verse of a Quran
 */

// the total number of surahs in the Quran
const TOTAL_SURAHS = 114;

// declares the number of ayahs based on the chosen surah
let totalAyahs;

// declares the randomly chosen surah 
let surahNumber;

// declares the randomly chosen ayah
let ayahNumber;

// declares the Arabic ayah from the surah
let ayah;

// declares the translated ayah from Arabic
let translatedAyah;

// the Quran API link
const SURAH_URL = 'https://api.alquran.cloud/v1/surah/';

// declares the API call for the translation
let newSurahURL;

// the part of the link for the English translation
let eng = 'en.sahih';

// gets a random ayah on startup 
getRandomAyah();

// gets a random ayah from the Quran API and displays it
async function randomAyah() {
    // showLoader();

    surahNumber = Math.floor(Math.random() * (TOTAL_SURAHS - 1)) + 1;
    newSurahURL = SURAH_URL + surahNumber;

    const response = await fetch(newSurahURL);
    const chapterJSON = await response.json();

    totalAyahs = chapterJSON.data.numberOfAyahs;
    
    ayahNumber = Math.floor(Math.random() * totalAyahs);
   
    ayah = chapterJSON.data.ayahs[ayahNumber].text;

    translateAyah();

    return Promise.resolve('Getting the ayah works!');
}

// translates the random ayah
async function translateAyah() {
    newSurahURL += '/' + eng;

    const response = await fetch(newSurahURL);
    const chapterJSON2 = await response.json();
    
    translatedAyah = chapterJSON2.data.ayahs[ayahNumber].text;

    printToHTML();

    return Promise.resolve('Getting the translation works!');
}

// prints the random ayah and translation to the HTML file
function printToHTML() {
    // hides the loader and displays the text
    document.getElementById('loadingCircle').style.display = 'none';
    document.getElementById('verse').style.display = 'block';
    document.getElementById('translation').style.display = 'block';

    document.getElementById('verse').innerHTML = ayah;
    document.getElementById('translation').innerHTML = (surahNumber + ':' + (ayahNumber + 1)).bold();
    document.getElementById('translation').innerHTML += ' ' + translatedAyah;
}

// shows a loader while the JSON loads
function showLoader() {
    document.getElementById('loadingCircle').style.display = 'block';
    document.getElementById('verse').style.display = 'none';
    document.getElementById('translation').style.display = 'none';
}

// gets a random ayah
async function getRandomAyah() {
    randomAyah()
}

//quote array
var quotes = ["Blank", "\"Dude, suckin' at something is the first step at being sorta good at something.\"<br>-  Jake <small><em>(Adventure Time)</em></small>", "\"Either I will find a way, or I will make one.\"<br> - Philip Sidney", "\"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.\"<br>- Thomas A. Edison", "\"You are never too old to set another goal or to dream a new dream.\"<br>- C.S Lewis", "\"If you can dream it, you can do it.\"<br>- Walt Disney", "\"Never give up, for that is just the place and time that the tide will turn.\"<br>- Harriet Beecher Stowe", "\"I know where I'm going and I know the truth, and I don't have to be what you want me to be. I'm free to be what I want.\"<br>- Muhammad Ali", "\"If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them.\"<br>- Bruce Lee",];




