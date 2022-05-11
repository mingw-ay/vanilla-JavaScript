1. ##### 卡片式的轮播图，左右有重叠，缩小后展示一部分

- 和普通轮播图的区别在于

  - 需要给每一张图片一个偏移量，以达到重叠的效果

    ```js
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
    ```

    ```js
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
    ```

  - 在给整个`container`设置偏移量进行轮播的时候，同样需要计算，保证主图在可视范围的正中间

    ```js
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
    ```

  - `setScale`方法中对图片进行缩放，同时设置视口可见的三个图的`zIndex`

    ```js
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
    ```

  - 大量的设置`transition`进行过渡效果的切换，可能应该封装为两个函数，一个`setTransition`，一个`removeTransition`。需要有这么多的切换的原因在于在`hover`标志以及轮播的过程中需要考虑边界情况。

    ```js
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
    ```

    上面这个`hoverIndicator`的监听事件真的太多过渡效果切换的重复代码。