let computerNum = 0; //랜덤번호 지정
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let history = [];

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function(){
    userInput.value = '';
});

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", computerNum);
}

function play() {
    let userValue = parseInt(userInput.value);

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = '1과 100 사이 숫자를 입력해 주세요.';
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = '이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.';
        return;
    }

    chances--;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    console.log('chance', chances);

    if (computerNum < userValue) {
        resultArea.textContent = "내려!!";
    } else if (computerNum > userValue) {
        resultArea.textContent = "올려!!";
    } else {
        resultArea.textContent = "맞췄..네..?";
        gameOver = true;
    }

    history.push(userValue);
    console.log(history);

    if (gameOver) {
        playButton.disabled = true;
    } else if (chances < 1) {
        gameOver = true;
        resultArea.textContent = `게임 오버! 정답은 ${computerNum}였습니다.`;
        playButton.disabled = true;
    }
}

function reset() {
    userInput.value = '';
    chances = 5;
    gameOver = false;
    history = [];
    pickRandomNum();
    resultArea.textContent = '결과값이 여기 나옵니다!';
    chanceArea.textContent = `남은 기회: ${chances}번`;
    playButton.disabled = false;
}

pickRandomNum();
