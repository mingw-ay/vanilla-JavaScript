##### 使用改变定位来实现的轮播图，借鉴`element-plus`上的`carousel`组件的长相

- `CSS`主要包括三个部分

  - `container`包含六张图片，只要轮播四张，不过需要头尾相连保证轮播的时候过度效果流畅, 图片通过`float: right`来实现一张一张地水平摆放在容器上

    ```css
    .visible {
        position: relative;
        width: 600px;
        height: 300px;
        overflow: hidden;
        margin: 100px auto 0;
    }
    
    /* IMAGE CONTAINER */
    .carousel-container {
        width: calc(600px * 6);
        height: 300px;
        position: relative;
        left: 0;
        transform: translateX(-600px);
        transition: left linear 1.5s;
    }
    
    .carousel-container .image {
        width: 600px;
        height: 300px;
        float: left;
    }
    ```

  - 两个`class=arrow`的箭头，使用`iconfont`上的两个图标，绝对定位在整体组件的左右两侧，垂直居中，当鼠标`hover`到组件内部的时候，才慢慢移到组件内

  - 四个`indicator`，在组件的外面，表示现在在哪张图片。同时`hover`到每个标志都会强制将图片移动过去

- `JavaScript`分别实现几个事件监听以及轮播的逻辑

  - 轮播逻辑

    首先需要采用一个全局的`index`记录当前是在第几张图片，然后使用`setTimeout`的回调函数来进行轮播，每次回调首先将`index`递增1，然后再判断index是否已经`>=5`了，如果是的首先将`index`设为5，同时增加一个定时器，一旦转到了下一张图片，也就是第六张（最后一张），就在没有`transition`动效的前提下立即转到第二张，骗过观众的眼睛。每次轮播都调用特定函数，将`container`标签的`left`设值。

    ```js
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
    ```
    
    移动函数如下，主要包括移动，以及给`indicator`设置`class`保证只有当前图片对应的`indicator`是`active`的
    
    ```js
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
    ```

  * 然后是给每个`indicator`添加`mouseover`事件的监听器，一旦`hover`到了，就跳转到指定索引的图片，并且清除当前的定时器`timer`，同时需要注意的是，如果是在跳到最后一张的时候`hover`到了，还得清除另一个负责偷天换日转回开头的计时器，因为`hover`到某个图片就不能轮播了

    ```js
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
    ```

    需要在`mouseout`的时候从新设置一个记事器（需要保证当前计时器`timer`为空），因为之前监听的是所有`indicator`的父节点，故而有可能并没有清除记事起

  * 然后是点击向左以及向右的按钮，因为是点击，所以这里的`transition`过渡效果时长需要较短，这里设置了`0.4s`，同时也要注意到了边界的时候要设置另一个定时器来进行无过渡效果的移动

    以向左走为例

    ```js
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
    ```


  - 需要主要清除和从新开启计时器的事件监听

    ```js
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
    ```

  * 效果大概如下

    ![image-20220510123802562](README_imgs/image-20220510123802562.png)

- 需要注意
  - 再hover底下的标志时，尽量按照轮播的顺序移动，如：如果在第三张或者第四张的时候需要移动到第一张，仍然需要先移到最后一张，再偷偷地返回第一张的位置
  - 同时在hover或者使用箭头的时候过渡效果要快一些
  - 注意在hover到最后一张的时候不仅需要清除用于轮播的计时器，还有准备要偷偷换到前面图片的那个计时器。