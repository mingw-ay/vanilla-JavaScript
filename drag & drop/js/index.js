/* 得到图片元素 */
const image = document.querySelector(".image");
/* 得到所有当前为空的元素 */
const container = document.querySelector(".container");

image.addEventListener("dragstart", onDragStart);
image.addEventListener("dragend", onDragEnd);

/* 事件委托，给container添加事件处理程序 */
container.addEventListener("dragover", onDragOver);
container.addEventListener("dragenter", onDragEnter);
container.addEventListener("drop", onDragDrop);
container.addEventListener("dragleave", onDragLeave);

/* 开始拖拽的方法 */
function onDragStart(e) {
    this.classList.add("hold");
    /* 等到已经拖拽完成后再从原位置去掉图片 */
    setTimeout(() => {
        this.classList.remove("image");
        this.parentNode.classList.remove("filled");
    }, 0);
}

/* 拖拽结束的方法，这里的方法都是作用域被拖拽的对象 */
function onDragEnd(e) {
    this.classList.add("image");
    this.classList.remove("hold");
    this.parentNode.classList.add("filled");
}

/* 添加的onDragOver以及onDragEnter */
function onDragOver(e) {
    const target = e.target;
    if (target !== container) {
        e.preventDefault();
    }
}

/* 拖拽入某个frame */
function onDragEnter(e) {
    const target = e.target;
    if (target !== container) {
        e.preventDefault();
        target.classList.add("hovered");
    }
}

/* 离开某个frame */
function onDragLeave(e) {
    const target = e.target;
    if (target !== container) {
        target.classList.remove("hovered");
    }
}

/* drop就意味着将图片移动到这里来 */
function onDragDrop(e) {
    const target = e.target;
    if (target !== container) {
        /* 去除边框 */
        target.classList.remove("hovered");
        /* 设置大小，即当前的frame时filled了 */
        target.classList.add("filled");
        image.classList.remove("hold");
        target.append(image);
    }
}
