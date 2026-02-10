window.addEventListener('load', () => {
    const introScreen = document.getElementById('introScreen');
    const mainContainer = document.querySelector('.container');

    // 4.5초 뒤 (사진4+글씨가 다 나오고 읽을 때쯤)
    setTimeout(() => {
        
        // 1. 인트로 화면 사라지기 시작 (투명해짐)
        introScreen.classList.add('fade-out');
        
        // ★ 핵심: 인트로가 사라지는 "동시에" 메인 화면도 나타나게 함 (기다리지 않음!)
        mainContainer.classList.add('show-main');
        
        // 2. 1초 뒤에 인트로 화면을 아예 삭제 (뒷정리)
        setTimeout(() => {
            introScreen.style.display = 'none'; 
        }, 1000); 

    }, 3400); // 3.4초 타이밍
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


document.addEventListener('DOMContentLoaded', () => {

    /* 1. 인트로 설정 (기존 코드 유지) */
    const introScreen = document.getElementById('introScreen');
    const mainContainer = document.querySelector('.container');
    setTimeout(() => {
        if(introScreen) introScreen.classList.add('fade-out');
        if(mainContainer) mainContainer.classList.add('show-main');
        setTimeout(() => { if(introScreen) introScreen.style.display = 'none'; }, 1000);
    }, 6000);


    /* 2. 갤러리 변수 설정 */
    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const mainPrev = document.querySelector('.main-prev'); // 메인 왼쪽 화살표
    const mainNext = document.querySelector('.main-next'); // 메인 오른쪽 화살표


    /* 3. 하트 도트 & 스크롤 감지 기능 */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(slides).indexOf(entry.target);
                dots.forEach(d => d.classList.remove('active'));
                if(dots[index]) dots[index].classList.add('active');
            }
        });
    }, { root: slider, threshold: 0.5 });
    slides.forEach(slide => observer.observe(slide));

    // 하트 클릭 시 이동
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const slideWidth = slider.clientWidth;
            slider.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
        });
    });


    /* 4. 메인 화살표 클릭 기능 (슬라이드 넘기기) */
    if (mainPrev && mainNext) {
        mainPrev.addEventListener('click', () => {
            slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
        });
        mainNext.addEventListener('click', () => {
            slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
        });
    }


    /* 5. 팝업(라이트박스) 기능 */
    const allImages = document.querySelectorAll('.gallery-slider img'); // 모든 사진 찾기
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close-btn');
    const modalPrev = document.querySelector('.prev-btn'); // 팝업 내부 화살표
    const modalNext = document.querySelector('.next-btn'); // 팝업 내부 화살표
    let currentPhotoIndex = 0;

    // (1) 사진 클릭 시 팝업 열기
    allImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            if(modal) {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                currentPhotoIndex = index;
            }
        });
    });

    // (2) 팝업 닫기
    const closeModal = () => { if(modal) modal.style.display = 'none'; };
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // (3) 팝업 내부 사진 변경
    const updateModalImage = (index) => {
        if (index < 0) currentPhotoIndex = allImages.length - 1;
        else if (index >= allImages.length) currentPhotoIndex = 0;
        else currentPhotoIndex = index;
        modalImg.src = allImages[currentPhotoIndex].src;
    };

    if(modalPrev) modalPrev.addEventListener('click', (e) => {
        e.stopPropagation(); updateModalImage(currentPhotoIndex - 1);
    });
    if(modalNext) modalNext.addEventListener('click', (e) => {
        e.stopPropagation(); updateModalImage(currentPhotoIndex + 1);
    });
});
