// 스크롤 키워드
window.onload = () => {
  const listItems = document.querySelectorAll('.list-item');
  const listWrapper = document.getElementById("list-item-wrapper");

  const getScrollConfig = () => {
    const offsetAdjustment = window.innerHeight * 0.40;
    const listStyleChangeStartY = listWrapper.offsetTop - offsetAdjustment;
    const listStyleChangeEndY = listStyleChangeStartY + listWrapper.offsetHeight;
    const division = (listStyleChangeEndY - listStyleChangeStartY) / listItems.length;
    return { listStyleChangeStartY, listStyleChangeEndY, division };
  };

  let scrollConfig = getScrollConfig();

  const updateActiveListItem = () => {
    const { listStyleChangeStartY, listStyleChangeEndY, division } = scrollConfig;

    if (document.getElementById("on")) {
      document.getElementById("on").removeAttribute("id");
    }

    if (listStyleChangeStartY < window.scrollY && window.scrollY < listStyleChangeEndY) {
      const targetIndex = Math.floor((window.scrollY - listStyleChangeStartY) / division);
      if (listItems[targetIndex]) {
        listItems[targetIndex].id = "on";
      }
    }
  };

  window.addEventListener("scroll", updateActiveListItem);

  window.addEventListener("resize", () => {
    scrollConfig = getScrollConfig();
  });
};

// n일 계산
const today = new Date();
const deadline = new Date('2025-06-30');
const diffTime = deadline - today;
const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
const span = document.querySelector('span[data-deadline]');
if (span) {
    span.textContent = diffDays;
}

// 슬라이드 이미지
let currentImage = 0
const sliderImages = document.querySelectorAll('.slider-image')
const sliderIndex = document.getElementById('slider-index')
const handleSlideChange = (step) => {
    currentImage += step
    
    if (currentImage < 0) {
        currentImage = sliderImages.length - 1
    } else if (currentImage >= sliderImages.length) {
        currentImage = 0
    }

    sliderContentWrapper.scrollLeft = sliderImages[currentImage].offsetLeft
}

document.getElementById("left-button").addEventListener("click", () => {
    handleSlideChange(-1)
})

document.getElementById("right-button").addEventListener("click", () => {
    handleSlideChange(1)
})

const sliderContentWrapper = document.getElementById("slider-content-wrapper")
sliderContentWrapper.addEventListener("scroll", () => {
    const imageWidth = document.querySelectorAll('.slider-image')[0].offsetWidth

    currentImage = Math.round(sliderContentWrapper.scrollLeft / imageWidth)
    sliderIndex.innerText = `${currentImage + 1}/${sliderImages.length}`
})

window.addEventListener("load", () => {
  let hasAutoSlid = false;

  window.addEventListener("scroll", () => {
    const section = document.getElementById("section2");
    const rect = section.getBoundingClientRect();

    if (!hasAutoSlid && rect.top < window.innerHeight * 0.3) {
      hasAutoSlid = true;

      setTimeout(() => {
        handleSlideChange(1); // sliderContentWrapper가 준비된 시점이어야 함
      }, 600);
    }
  });
});

// 공유하기 버튼
let toastTimeouts = [];

function clearAllToastTimeouts() {
  toastTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
  toastTimeouts = [];
}

function sharePage() {
  const followUpMessages = [
    "로또 당첨 확률업 🍀",
    "널리널리 퍼트려 주세요 ✨",
    "당신 덕분에 변화가 시작됩니다 💜",
    "함께해요, 더 멋진 미래를 위해 🚀",
    "함께하는 힘 💪",
    "공유할수록 큰 힘이 됩니다 ✨"
  ];

  const toast = document.getElementById("copy-toast");
  const followUpMessage = followUpMessages[Math.floor(Math.random() * followUpMessages.length)];

  clearAllToastTimeouts();

  toast.textContent = "✅ 복사 완료!";
  toast.classList.add("show");
  toast.style.opacity = "1";

  toastTimeouts.push(setTimeout(() => {
    toast.style.opacity = "0";

    toastTimeouts.push(setTimeout(() => {
      toast.textContent = followUpMessage;
      toast.style.opacity = "1";

      toastTimeouts.push(setTimeout(() => {
        toast.classList.remove("show");
        toast.style.opacity = "";
      }, 2000));
    }, 600));
  }, 1200));

  navigator.clipboard.writeText("https://y-union.github.io").catch(console.error);
}

// 이벤트 독려 말풍선
const balloon = document.querySelector('.floating-nav a:nth-child(2) .balloon');
let scrollTimeout;

window.addEventListener('scroll', () => {
  if (!balloon) return;

  balloon.classList.add('show');

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    balloon.classList.remove('show');
  }, 1000);
});