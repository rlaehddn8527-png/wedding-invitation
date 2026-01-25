// script.js

// 페이지가 로딩되면 실행
window.addEventListener('load', () => {
    const introScreen = document.getElementById('introScreen');

    // 2.5초(2500ms) 후에 실행될 함수 설정
    // (텍스트 등장 1.5초 + 감상 시간 1초 = 총 2.5초)
    setTimeout(() => {
        // 인트로 화면에 'fade-out' 클래스를 추가해서 사라지는 애니메이션 시작
        introScreen.classList.add('fade-out');
        
        // 애니메이션이 끝난 후 (1초 뒤) 화면에서 완전히 제거해서 클릭 등 방해 안 되게 함
        setTimeout(() => {
             introScreen.style.display = 'none';
        }, 1000);

    }, 2500); // 시간 조절 가능 (단위: 밀리초)
});