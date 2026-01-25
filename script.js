window.addEventListener('load', () => {
    const introScreen = document.getElementById('introScreen');
    const mainContainer = document.querySelector('.container');

    // 1. 인트로 재생 (7초 동안 유지)
    setTimeout(() => {
        
        // 2. 7초 땡! 하면 인트로 화면 페이드 아웃 (서서히 사라짐)
        introScreen.classList.add('fade-out');
        
        // 3. 페이드 아웃 애니메이션 시간(1초)만큼 기다렸다가
        setTimeout(() => {
            introScreen.style.display = 'none'; // 인트로 아예 삭제
            
            // ★ 4. 인트로가 완전히 꺼지면 -> 그때 메인 화면 등장!
            mainContainer.classList.add('show-main');
            
        }, 1000); // 1초 대기 (fade-out 시간과 맞춤)

    }, 7000); // 7초 뒤 시작
});

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('계좌번호가 복사되었습니다: ' + text);
    }).catch(err => {
        alert('복사 실패 (보안 설정 때문일 수 있습니다)');
    });
}

// script.js 수정 (음악 부분)

const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');

// SVG 아이콘 데이터 (Play / Mute)
const iconPlay = `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
    <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
</svg>`;

const iconMute = `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
    <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T784-481q0 53-14 102.5T720-481ZM480-488 280-288H200v-80h114l86-86v174ZM480-672v-128l-70 70-110 110h-15l195-195Z"/>
</svg>`;

bgm.volume = 0.3; // 볼륨 30%
let isPlaying = true; // ★ 기본값을 '켜짐'으로 설정

// 페이지 로드 시 자동 재생 시도
window.addEventListener('load', () => {
    bgm.play().catch(error => {
        // 브라우저가 자동 재생을 막았을 경우의 처리
        console.log("자동 재생이 차단되었습니다. 사용자 클릭 대기 중...");
        isPlaying = false; // 일단은 꺼진 상태로 인식
        musicBtn.innerHTML = iconMute; // 아이콘도 Mute로 변경 (솔직하게)
    });
});

musicBtn.addEventListener('click', toggleMusic);

function toggleMusic() {
    if (isPlaying) {
        // 끄기
        bgm.pause();
        musicBtn.innerHTML = iconMute;
        musicBtn.classList.remove('music-playing');
        isPlaying = false;
    } else {
        // 켜기
        bgm.play();
        musicBtn.innerHTML = iconPlay;
        musicBtn.classList.add('music-playing');
        isPlaying = true;
    }
}

// ★ 중요: 자동 재생이 막혔을 때를 대비해, 화면 아무 곳이나 터치하면 바로 시작되게 함
document.body.addEventListener('click', function firstClick() {
    if (bgm.paused) {
        bgm.play();
        musicBtn.innerHTML = iconPlay;
        musicBtn.classList.add('music-playing');
        isPlaying = true;
    }
    // 한 번 실행되면 삭제 (계속 켜지면 안 되니까)
    document.body.removeEventListener('click', firstClick);
}, { once: true });