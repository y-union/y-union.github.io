// 스크롤 키워드
const listItems = document.querySelectorAll('.list-item')
const listWrapper = document.getElementById("list-item-wrapper")

const offsetAdjustment = window.innerHeight * 0.40
const listStyleChangeStartY = listWrapper.offsetTop - offsetAdjustment
const listStyleChangeEndY = listStyleChangeStartY + listWrapper.offsetHeight;

const division = (listStyleChangeEndY - listStyleChangeStartY) / listItems.length

window.addEventListener("scroll", () => {
    if (document.getElementById("on")) {
        document.getElementById("on").removeAttribute("id")
    }

    if (listStyleChangeStartY < window.scrollY 
        && window.scrollY < listStyleChangeEndY) {
            const targetIndex = Math.floor((window.scrollY - listStyleChangeStartY) / division)
            if (listItems[targetIndex]) {
                listItems[targetIndex].id = "on"
            }
    }
})

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

let hasAutoSlid = false;

window.addEventListener("scroll", () => {
  const section = document.getElementById("section2");
  const rect = section.getBoundingClientRect();

  if (!hasAutoSlid && rect.top < window.innerHeight * 0.05) {
    hasAutoSlid = true;
    setTimeout(() => {
      handleSlideChange(1);
    }, 600);
  }
});
