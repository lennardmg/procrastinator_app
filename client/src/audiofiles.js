
const N = 51;
// const audios = Array.from({length: N}, (_, index) => index + 1);

export default function createAudio() {
    let randomNumber = Math.floor(Math.random() * N) + 1;
    let string = "/Sounds/" + randomNumber.toString() + ".mp3"
    let audio = new Audio(string);
    return audio
} 




