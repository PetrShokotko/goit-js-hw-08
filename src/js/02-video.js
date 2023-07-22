import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTime = localStorage.getItem('videoplayer-current-time') || 0;

player.setCurrentTime(currentTime).then(() => {
}).catch(error => {
  console.error(error);
});

player.on('timeupdate', throttle(e => {
  localStorage.setItem('videoplayer-current-time', e.seconds);
}, 1000));