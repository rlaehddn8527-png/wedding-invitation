window.addEventListener('load', () => {
    const introScreen = document.getElementById('introScreen');

    // 총 재생 시간: 
    // 사진1(3초) + 사진2(3초) + 사진3(등장2초) + 글씨쓰기(2초) + 감상(2초) = 약 12초
    
    setTimeout(() => {
        introScreen.classList.add('fade-out');
        
        setTimeout(() => {
             introScreen.style.display = 'none';
        }, 1500); // 페이드아웃 애니메이션 시간(1.5초)과 맞춤

    }, 12000); // 12000ms = 12초 뒤에 인트로 종료
});