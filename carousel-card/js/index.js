const imgURLs = [
    "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
];
/* 拿到DOM对象 */
const carouselComponent = document.querySelector(".visible");
const container = document.querySelector(".carousel-container");
const imageDivs = container.getElementsByClassName("image");
const indicatorsDiv = document.querySelector(".indicators");
const indicators = indicatorsDiv.querySelectorAll(".indicator");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
let timer; /* 全局记录timeout */
let timer1; /* 这是那个需要跳到开头的timeout */
let index = 1; /* 当前所在图片的索引 */

/* 给每个image加上背景,以及宽高*/
for (let i = 0; i < imageDivs.length; i++) {
    let image = imageDivs[i];
    image.style.background = `url("${imgURLs[i]}") center center no-repeat`;
}

/* 首先将前两张图片复制到后面，后一张复制到前面 */
let len = imageDivs.length;
container.appendChild(imageDivs[0].cloneNode(false));
container.appendChild(imageDivs[1].cloneNode(false));
container.insertBefore(imageDivs[len - 1].cloneNode(false), imageDivs[0]);

const totalWidth = carouselComponent.offsetWidth;
/* 图片原始宽度 */
const imgWidth = imageDivs[0].offsetWidth;
/* 图片缩放比例 */
const ratio = 0.84;
/* 图片重叠距离 */
const gap = 200;
/* 要重叠这个距离需要的偏移量，往左偏 */
const imgOffset = ((1 - ratio) * imgWidth) / 2 + gap;
/* 整个空间除了主图片每张图片的剩余空间 */
const remainingWidth = (totalWidth - imgWidth) / 2;
len += 3;
/* 初始化位置 */
init(imgOffset);
setScale(1);

/* 添加事件监听 */
leftArrow.addEventListener("click", goLeft);
rightArrow.addEventListener("click", () => {
    autoCarousel(0.4);
});
carouselComponent.addEventListener("mouseover", () => {
    clearTimeout(timer);
});
carouselComponent.addEventListener("mouseout", () => {
    timer = setTimeout(carouselCbk, 2000);
});
indicatorsDiv.addEventListener("mouseover", hoverToMove);
indicatorsDiv.addEventListener("mouseout", () => {
    if (timer === null) {
        timer = setTimeout(carouselCbk, 2000);
    }
});

/* 缩放除了主图片的所有图片 */
function setScale(index) {
    const len = imageDivs.length;
    for (let i = 0; i < len; i++) {
        let image = imageDivs[i];
        if (i !== index) {
            image.style.transform = "scale(0.8)";
            image.style.zIndex = 0;
        }
    }
    imageDivs[index].style.transform = "scale(1)";
    imageDivs[index].style.zIndex = 2;
    imageDivs[index - 1].style.zIndex = 1;
    imageDivs[index + 1].style.zIndex = 1;
}

function init(imgOffset) {
    const len = imageDivs.length;
    for (let i = 0; i < len; i++) {
        let image = imageDivs[i];
        if (i !== 0) {
            image.style.left = `${-imgOffset * i}px`;
        }
    }
    container.style.left = `-${(imgWidth - imgOffset) * 1 - remainingWidth}px`;
}

timer = setTimeout(carouselCbk, 3000);

/* 轮播逻辑 */
function autoCarousel(interval) {
    index++;
    /* 如果已经到了末尾 */
    if (index > 5) {
        /* 回到开头 */
        index = 1;
        container.style.transition = "none";
        imageDivs[index].style.transition = "none";
        moveToIndex(index, imgWidth, imgOffset);
        setScale(index);
        index++;
    }
    setTimeout(() => {
        container.style.transition = `left linear ${interval}s`;
        imageDivs[index].style.transition = `transform linear ${interval}s`;
        imageDivs[index - 1].style.transition = `transform linear ${interval}s`;
        setScale(index);
        moveToIndex(index, imgWidth, imgOffset);
    }, 0);
}

function carouselCbk() {
    autoCarousel(1);
    timer = setTimeout(carouselCbk, 3000);
}

function moveToIndex(index, imgWidth, imgOffset) {
    const offset = index * (imgWidth - imgOffset) - remainingWidth;
    container.style.left = `-${offset}px`;

    let targetIndex = index - 1;
    if (index === 5) {
        targetIndex = 0;
    }
    for (const indicator of indicators) {
        indicator.classList.remove("active");
    }
    indicators[targetIndex].classList.add("active");
}

function goLeft() {
    index--;
    if (index === 0) {
        /* 需要去最后一个 */
        index = 5;
        container.style.transition = "none";
        imageDivs[index].style.transition = "none";
        moveToIndex(index, imgWidth, imgOffset);
        setScale(index);
        index--;
    }
    setTimeout(() => {
        container.style.transition = "left linear 0.4s";
        imageDivs[index].style.transition = "transform linear 0.4s";
        imageDivs[index + 1].style.transition = "transform linear 0.4s";
        setScale(index);
        moveToIndex(index, imgWidth, imgOffset);
    }, 0);
}

function hoverToMove(e) {
    /* 保证hover到的是图片 */
    let target = e.target;
    if (target !== indicatorsDiv) {
        /* 清除计时器 */
        clearTimeout(timer);
        timer = null;
        /* 得到索引 */
        let targetIndex = [...indicators].indexOf(target);
        /* 边界情况，如果当前index是5,意思是克隆的第一个并且targetIndex不是3 */
        if (index === 5 && targetIndex !== 3 && targetIndex !== 0) {
            /* 首先移动到1 */
            index = 1;
            container.style.transition = "none";
            imageDivs[index].style.transition = "none";
            setScale(index);
            moveToIndex(index, imgWidth, imgOffset);
            /* 然后移动到targetIndex */
            setTimeout(() => {
                index = targetIndex + 1;
                container.style.transition = "left linear 0.4s";
                imageDivs[index - 1].style.transition = "transform linear 0.4s";
                imageDivs[index].style.transition = "transform linear 0.4s";
                imageDivs[index + 1].style.transition = "transform linear 0.4s";
                setScale(index);
                moveToIndex(index, imgWidth, imgOffset);
            }, 0);
            return;
        }

        /* 如果当前是第三个或者第四个且需要去第一个,首先去末尾然后偷偷转到前面 */
        if (targetIndex === 0 && index > indicators.length >> 1) {
            console.log(index);
            timer1 = setTimeout(() => {
                index = 1; /* 转到1去 */
                container.style.transition = "none";
                imageDivs[index].style.transition = "none";
                moveToIndex(index, imgWidth, imgOffset);
                setScale(index);
            }, 400);
            index = 5;
        } else {
            index = targetIndex + 1;
        }
        container.style.transition = "left linear 0.4s";
        imageDivs[index].style.transition = "transform linear 0.4s";
        imageDivs[index + 1].style.transition = "transform linear 0.4s";
        setScale(index);
        moveToIndex(index, imgWidth, imgOffset);
    }
}
