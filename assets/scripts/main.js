var music = [];
var currentTrack = {};
var pausePlayState = 'play';
var songCount = 0;

var pause = function() {
  currentTrack.audio.pause();
}

var nextTrack = function() {
  var data = music[songCount++];
  currentTrack = data;
  $('.song-name').text(data.song);
  $('.artist-name').text(data.artist);
  $('.album-name').text(data.album);
  $('#album-covers').prepend('<div class="inline"><img class="album-cover" src="' + data.art + '"></div>');
  currentTrack.audio.play();
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
    } else {
      currentTrack.audio.play();
      pausePlayState = 'play';
    }
  });
  
  $('#skip').click(function() {
    currentTrack.audio.pause();
    currentTrack.audio.currentTime = 0;
    nextTrack();
  });
};

$(document).ready(init);

