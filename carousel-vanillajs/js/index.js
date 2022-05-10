const imgURLs = [
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
];
/* 拿到DOM对象 */
const carouselComponent = document.querySelector(".visible");
const container = document.querySelector(".carousel-container");
const imageDivs = container.querySelectorAll(".image");
const indicatorsDiv = document.querySelector(".indicators");
const indicators = indicatorsDiv.querySelectorAll(".indicator");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const width = imageDivs[0].offsetWidth;
let timer; /* 全局记录timeout */
let timer1; /* 这是那个需要跳到开头的timeout */
let index = 0; /* 当前所在图片的索引 */

/* 给每个image加上背景*/
for (let i = 0; i < imageDivs.length; i++) {
    let image = imageDivs[i];
    image.style.background = `url("${imgURLs[i]}") center center no-repeat`;
}

/* 设置事件监听 */
indicatorsDiv.addEventListener("mouseover", hoverToMove);
indicatorsDiv.addEventListener("mouseout", () => {
    if (timer === null) {
        timer = setTimeout(carouselCbk, 2000);
    }
});
rightArrow.addEventListener("click", goRight);
leftArrow.addEventListener("click", goLeft);
carouselComponent.addEventListener("mouseover", () => {
    /* 清除计时器，不能再动了 */
    clearTimeout(timer);
});
carouselComponent.addEventListener("mouseout", () => {
    timer = setTimeout(carouselCbk, 2000);
});

/* 开始轮播 */
timer = setTimeout(carouselCbk, 3000);
/* 轮播逻辑，setTimeout的回调函数 */
function carouselCbk() {
    index++;
    /* 如果index到了最右边的那一张也就是4 */
    if (index === 4) {
        /* 设置回调，一旦过度完成，立即偷天换日 */
        timer1 = setTimeout(() => {
            index = 0; /* 回到起点 */
            container.style.transition = "none";
            moveToIndex(index);
        }, 1500);
    }
    if (index > 4) {
        /* 防止点的太快了 */
        index = 4;
    } else {
        container.style.transition = "left linear 1.5s";
        moveToIndex(index);
    }
    timer = setTimeout(carouselCbk, 3000);
}

/* 移动逻辑 */
function moveToIndex(index) {
    /* 通过修改container的left属性进行移动 */
    let offset = index * -width;
    container.style.left = `${offset}px`;
    /* 修改indicators的class */
    let target = index;
    if (index === 4) {
        target = 0;
    } else if (index === -1) {
        target = 3;
    }
    for (let i = 0; i < indicators.length; i++) {
        if (i === target) {
            indicators[i].classList.add("active");
        } else {
            indicators[i].classList.remove("active");
        }
    }
}

/* hover到每个indicator的事件监听 */
function hoverToMove(e) {
    /* 保证hover到了具体的每个标志*/
    let target = e.target;
    if (target !== indicatorsDiv) {
        /* 取消定时器 */
        clearTimeout(timer);
        clearTimeout(timer1);
        timer = null; /* 设为空，等下判断是否需要重新设置 */
        /* 找到索引 */
        targetIndex = [...indicators].indexOf(target);
        /* 如果当前在第三张或者第四章 */
        if (targetIndex === 0 && index >= 2) {
            index = 4; /* 先移到第四张 */
            setTimeout(() => {
                index = 0;
                container.style.transition = "none";
                moveToIndex(index);
            }, 600);
        } else {
            index = targetIndex;
        }
        container.style.transition = "left linear 0.6s";
        moveToIndex(index);
    }
}

/* 点击右箭头的事件监听 */
function goRight(e) {
    index++;
    if (index > 4) {
        /* 如果大于四了说明点的太快了 */
        index = 4;
        return;
    } else if (index === 4) {
        timer1 = setTimeout(() => {
            index = 0;
            container.style.transition = "none";
            moveToIndex(index);
        }, 600);
    }
    container.style.transition = "left linear 0.6s";
    moveToIndex(index);
}

/* 同理，点击左箭头 */
function goLeft(e) {
    index--;
    if (index < -1) {
        /* 如果超过了-1说明太快了 */
        index = -1;
        return;
    } else if (index === -1) {
        /* 需要回到末尾了 */
        timer1 = setTimeout(() => {
            index = 3;
            container.style.transition = "none";
            moveToIndex(index);
        }, 600);
    }
    container.style.transition = "left linear 0.6s";
    moveToIndex(index);
}
