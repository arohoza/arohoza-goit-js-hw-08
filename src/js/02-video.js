import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

const onTimeUpdate = function (data) {
  // data is an object containing properties specific to that event
  player
    .getCurrentTime()
    .then(function (seconds) {
      // seconds = the current playback position

      //   console.log(seconds);
      localStorage.setItem('videoplayer-current-time', seconds);
      //   console.log(localStorage);
    })
    .catch(function (error) {
      // an error occurred
    });
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
