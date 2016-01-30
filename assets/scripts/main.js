var music = [];
var currentTrack = {};
var pausePlayState = 'play';
var songCount = 0;

var updateProgress = function() {
  var time = convertDuration(currentTrack.audio.currentTime + 1);
  $('#current-time').text(time);
  $('#audio-progress').attr('value',currentTrack.audio.currentTime);
};

//http://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
var convertDuration = function(seconds) {
  var h = parseInt(seconds / 3600 ) % 24;
  var m = parseInt(seconds / 60 ) % 60;
  var s = seconds % 60;
  s = Math.floor(s);
  return m + ":" + (s  < 10 ? "0" + s : s);
};

var nextTrack = function() {
  var data = music[songCount++];
  currentTrack = data;
  $('.song-name').text(data.song);
  $('.artist-name').text(data.artist);
  $('.album-name').text(data.album);
  $('#album-mini-cover').attr('src', data.art);
  $('#album-covers').prepend('<div class="inline"><img class="album-cover" src="' + data.art + '"></div>');
  if(!currentTrack.audio.duration) {
    currentTrack.audio.onloadedmetadata = function() {
      var time = convertDuration(currentTrack.audio.duration);
      $('#end-time').text(time);
    };
  } else {
    var time = convertDuration(currentTrack.audio.duration);
    $('#end-time').text(time);
  }
  currentTrack.audio.play();
  currentTrack.audio.ontimeupdate = updateProgress;
  currentTrack.audio.onended = nextTrack;
  $('#audio-progress').attr('max',currentTrack.audio.duration);
};

var loadMusicData = function(csv) {
  var lines = csv.split(/\r\n|\n/);
  for(var i = 1; i < lines.length; i++) {
    var values = lines[i].split(',');
    var m = {
      song: values[0],
      artist: values[1],
      album: values[2],
      art: '/assets/albums/' + values[3],
      audio: new Audio('/assets/tracks/' + values[4])
    };
    music.push(m);
  }
};

var init = function() {
  $.get('/data/music.csv', function(data) {
    loadMusicData(data);
    nextTrack();
  });
  
  $('#pause-play').click(function() {
    if(pausePlayState === 'play') {
      currentTrack.audio.pause();
      pausePlayState = 'pause';
      $('#pause-play > img').attr('src', '/assets/icons/btn_play.png');
    } else {
      currentTrack.audio.play();
      pausePlayState = 'play';
      $('#pause-play > img').attr('src', '/assets/icons/btn_pause.png');
    }
  });
  
  $('#skip').click(function() {
    currentTrack.audio.pause();
    currentTrack.audio.currentTime = 0;
    nextTrack();
  });
};

$(document).ready(init);

