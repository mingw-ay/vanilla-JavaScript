const imgURLs = [
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
];
/* 拿到DOM对象 */
const container = document.querySelector(".carousel-container");
const imageDivs = container.querySelectorAll(".image");
const indicatorsDiv = document.querySelector(".indicators");
const indicators = indicatorsDiv.querySelectorAll(".indicator");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
let timer; /* 全局记录timeout */
let timer1; /* 这是那个需要跳到开头的timeout */

/* 添加事件监听 */
leftArrow.addEventListener("click", goLeft);
rightArrow.addEventListener("click", goRight);
indicatorsDiv.addEventListener("mouseover", hoverToMove);
indicatorsDiv.addEventListener("mouseout", () => {
    /* 如果现在timer为空 */
    if (timer === null) {
        timer = setTimeout(carouselMoving, 2000);
    }
});
/* 一旦hover到内部，清除timeout */
container.parentElement.addEventListener("mouseover", () => {
    clearTimeout(timer);
});
container.parentElement.addEventListener("mouseout", () => {
    timer = setTimeout(carouselMoving, 2000);
});

/* 给每个image加上背景已经绝对定位 */
for (let i = 0; i < imageDivs.length; i++) {
    let image = imageDivs[i];
    image.style.background = `url("${imgURLs[i]}") center center no-repeat`;
    image.style.left = `${i * 600}px`;
}

/* 初始化当前所在索引，因为最开始是在第二张 */
let index = 1;


/* 每隔3s将整个盒子左移400px */
/* 一旦切换到了最后一个，在transition duration结束过后立即切回真正的开头*/
timer = setTimeout(carouselMoving, 3000);


/* 移动函数 */
function moveOffset(index) {
    let offset = index * -600;
    container.style.left = `${offset}px`;
    let target = (index - 1) % 4;
    if (index === 0) {
        target = 3;
    }
    for (let i = 0; i < indicators.length; i++) {
        if (target === i) {
            indicators[i].classList.add("active");
        } else {
            indicators[i].classList.remove("active");
        }
    }
}


/* setTimeout回调函数 */
function carouselMoving() {
    index++;
    /* 如果是要移到第六张了,考虑到可能会超出 */
    if (index >= 5) {
        index = 5;
        /* 当移动完了之后，立即切换到第二张 */
        timer1 = setTimeout(() => {
            index = 1;
            container.style.transition = "none";
            moveOffset(index);
        }, 1500);
    }
    container.style.transition = "left 1.5s linear";
    moveOffset(index);
    timer = setTimeout(carouselMoving, 3000);
}


/* 一旦hover到底下的标志 */
function hoverToMove(e) {
    if (e.target !== indicatorsDiv) {
        /* 清除当前计时器timer */
        clearTimeout(timer);
        clearTimeout(timer1);
        timer = null;
        let target = e.target;
        for (let i = 0; i < indicators.length; i++) {
            if (indicators[i] === target) {
                index = i + 1;
                container.style.transition = "left 1.5s linear";
                moveOffset(index);
                break;
            }
        }
    }
}


/* 一旦点击左走的按钮 */
function goLeft(e) {
    index--;
    if (index <= 0) {
        index = 0;
        /* 然后立即跳到最后一个去 */
        setTimeout(() => {
            index = 4;
            container.style.transition = "none";
            moveOffset(index);
        }, 400);
    }
    container.style.transtion = "left 0.4s linear";
    moveOffset(index);
}


/* 一旦点击到往右走的按钮 */
function goRight() {
    index++;
    /* 一定要考虑如果到了最后一个 */
    /* 防止触发次数过多 */
    if (index >= 5) {
        index = 5;
        setTimeout(() => {
            index = 1;
            container.style.transition = "none";
            moveOffset(index);
        }, 400);
    }
    container.style.transition = "left 0.4s linear";
    moveOffset(index);
}
