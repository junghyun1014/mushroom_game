let playerX = 300;
let playerY = 200;
let playerSize = 30; 
let playerSpeed = 5; 

// 1. 버섯들을 여러 개 담을 마법 주머니(배열)를 만듭니다!
let mushrooms = []; 

let startTime;       
let scoreTime = 0;   
let isGameOver = false;

function setup() {
  createCanvas(600, 400);
  resetGame(); 
  saveGif('my_animation',5);
}

function draw() {
  background(20, 30, 40);

  if (isGameOver === false) {
    scoreTime = ((millis() - startTime) / 1000).toFixed(1);

    // 플레이어 이동
    if (keyIsDown(LEFT_ARROW))  playerX -= playerSpeed;
    if (keyIsDown(RIGHT_ARROW)) playerX += playerSpeed;
    if (keyIsDown(UP_ARROW))    playerY -= playerSpeed;
    if (keyIsDown(DOWN_ARROW))  playerY += playerSpeed;

    // 2. 시간의 흐름에 따라 버섯 증식시키기!
    // frameCount는 화면이 그려진 횟수입니다. (초당 약 60번)
    // 120번 그려질 때마다(약 2초마다) 주머니에 새 버섯을 추가합니다.
    if (frameCount % 120 === 0) {
      mushrooms.push({
        x: random(50, 550), 
        y: random(50, 350),
        speedX: random(-3, 3), // 가로로 움직이는 무작위 속도
        speedY: random(-3, 3)  // 세로로 움직이는 무작위 속도
      });
    }

    // 3. 주머니(배열)에 들어있는 모든 버섯을 꺼내서 움직이고 화면에 그립니다.
    // 배열에서 요소를 삭제할 때는 뒤에서부터(역순으로) 확인하는 것이 안전합니다.
    for (let i = mushrooms.length - 1; i >= 0; i--) {
      let m = mushrooms[i]; // i번째 버섯 꺼내기

      // 버섯 움직이기
      m.x += m.speedX;
      m.y += m.speedY;

      // 버섯이 화면 밖으로 나가지 않고 벽에 튕기게 만들기
      if (m.x < 15 || m.x > width - 15) m.speedX *= -1;
      if (m.y < 15 || m.y > height - 15) m.speedY *= -1;

      // 버섯 그리기
      textSize(30);
      textAlign(CENTER, CENTER);
      text('🍄', m.x, m.y);

      // 충돌 검사: 플레이어와 현재 버섯이 닿았는가?
      let d = dist(playerX, playerY, m.x, m.y);
      if (d < (playerSize / 2) + 15) {
        playerSize += 25; // 패널티: 몸집 커짐!
        
        // 4. 먹힌 버섯은 화면에서 없애버립니다(주머니에서 제거).
        mushrooms.splice(i, 1); 
      }
    }

    // 플레이어 그리기
    fill(255, 200, 0);
    noStroke();
    circle(playerX, playerY, playerSize);

    // 벽 충돌 (게임 오버)
    if (playerX < playerSize / 2 || playerX > width - playerSize / 2 || 
        playerY < playerSize / 2 || playerY > height - playerSize / 2) {
      isGameOver = true;
    }

    // 시간 표시
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text('⏳ 버틴 시간: ' + scoreTime + '초', 20, 20);

  } else {
    // 게임 오버 화면
    background(120, 30, 30); 
    fill(255);
    textSize(45);
    textAlign(CENTER, CENTER);
    text('GAME OVER', width / 2, height / 2 - 30);
    textSize(25);
    text('당신이 버틴 시간: ' + scoreTime + '초', width / 2, height / 2 + 20);
    textSize(15);
    fill(200);
    text('다시 도전하려면 [R] 키를 누르세요', width / 2, height / 2 + 80);
  }
}

function keyPressed() {
  if (isGameOver && (key === 'r' || key === 'R')) {
    resetGame();
  }
}

function resetGame() {
  playerX = 300;
  playerY = 200;
  playerSize = 30;
  
  // 게임이 다시 시작될 때 버섯 주머니를 비우고 첫 버섯 1개를 넣어줍니다.
  mushrooms = []; 
  mushrooms.push({
    x: random(50, 550), 
    y: random(50, 350), 
    speedX: random(-3, 3), 
    speedY: random(-3, 3)
  });
  
  startTime = millis(); 
  isGameOver = false;
}