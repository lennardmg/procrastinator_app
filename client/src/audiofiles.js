
const N = 51;
const M = 1;
const L = 1;
// const audios = Array.from({length: N}, (_, index) => index + 1);

export function createAudioToDo() {
    let randomNumber = Math.floor(Math.random() * N) + 1;
    let string = "/sounds_to_do/" + randomNumber.toString() + ".mp3"
    let audio = new Audio(string);
    return audio
};

export function createAudioBreak() {
    let randomNumber = Math.floor(Math.random() * M) + 1;
    let string = "/sounds_break/" + randomNumber.toString() + ".mp3";
    let audio = new Audio(string);
    return audio;
};

export function createAudioWork() {
    let randomNumber = Math.floor(Math.random() * L) + 1;
    let string = "/sounds_work/" + randomNumber.toString() + ".mp3";
    let audio = new Audio(string);
    return audio;
};





