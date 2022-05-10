##### 使用改变定位来实现的轮播图，借鉴`element-plus`上的`carousel`组件的长相

- `CSS`主要包括三个部分

  - `container`包含六张图片，只要轮播四张，不过需要头尾相连保证轮播的时候过度效果流畅
  - 两个`class=arrow`的箭头，使用`iconfont`上的两个图标，绝对定位在整体组件的左右两侧，垂直居中，当鼠标`hover`到组件内部的时候，才慢慢移到组件内
  - 四个`indicator`，在组件的外面，表示现在在哪张图片。同时`hover`到每个标志都会强制将图片移动过去

- `JavaScript`分别实现几个事件监听以及轮播的逻辑

  - 轮播逻辑

    首先需要采用一个全局的`index`记录当前是在第几张图片，然后使用`setTimeout`的回调函数来进行轮播，每次回调首先将`index`递增1，然后再判断index是否已经`>=5`了，如果是的首先将`index`设为5，同时增加一个定时器，一旦转到了下一张图片，也就是第六张（最后一张），就在没有`transition`动效的前提下立即转到第二张，骗过观众的眼睛。每次轮播都调用特定函数，将`container`标签的`left`设值。

    ```js
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
    ```

    移动函数如下，主要包括移动，以及给`indicator`设置`class`保证只有当前图片对应的`indicator`是`active`的

    ```js
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
    ```

  * 然后是给每个`indicator`添加`mouseover`事件的监听器，一旦`hover`到了，就跳转到指定索引的图片，并且清除当前的定时器`timer`，同时需要注意的是，如果是在跳到最后一张的时候`hover`到了，还得清除另一个负责偷天换日转回开头的计时器，因为`hover`到某个图片就不能轮播了

    ```js
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
    ```

    需要在`mouseout`的时候从新设置一个记事器（需要保证当前计时器`timer`为空），因为之前监听的是所有`indicator`的父节点，故而有可能并没有清除记事起

  * 然后是点击向左以及向右的按钮，因为是点击，所以这里的`transition`过渡效果时长需要较短，这里设置了`0.4s`，同时也要注意到了边界的时候要设置另一个定时器来进行无过渡效果的移动

    以向左走为例

    ```js
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
    ```

    