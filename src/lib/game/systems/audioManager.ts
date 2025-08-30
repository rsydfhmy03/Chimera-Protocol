import clickSound from '$lib/assets/audio/typing-klik.mp3';
import successSound from '$lib/assets/audio/success.mp3';

const sounds = {
  click: new Audio(clickSound),
  success: new Audio(successSound),
};

// Fungsi untuk memainkan suara
export function play(soundName: keyof typeof sounds) {
  const sound = sounds[soundName];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}