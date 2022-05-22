require("./css/style.css");
require("./index.html?raw");

/* 拿到按钮 */
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const addButton = document.querySelector(".add-btn");
    addButton.addEventListener("click", () => {
        addNote(container);
    });
    /* 添加另外两个按钮的事件处理程序，添加到document对象上 */
    document.addEventListener("click", (e) => handleClick(e, container));
});

/* 点击按钮添加一个note组件 */
function addNote(container) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note-div");
    noteDiv.innerHTML = `
        <div class="note-header">
            <div class="write">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </div>
            <div class="remove">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="note-body write-mode">
            <p class="text"></p>
            <textarea class="note-text" cols="30" rows="10"> </textarea>
        </div>`;
    container.appendChild(noteDiv);
    /* 焦点放在新创建的位置 */
    noteDiv.getElementsByClassName("note-text")[0].focus();
}

// 点击两个按钮的事件处理程序
function handleClick(e, container) {
    const target = e.target;
    /* 如果是点击了write按钮 */
    if (
        target.classList.contains("write") ||
        target.classList.contains("fa-pencil-square-o")
    ) {
        /* 拿到所要处理结点note-body */
        let noteHeader = target.parentNode;
        while (!noteHeader.classList.contains("note-header")) {
            noteHeader = noteHeader.parentNode;
        }
        const noteBody = noteHeader.nextElementSibling;
        noteBody.classList.toggle("write-mode");
        if (!noteBody.classList.contains("write-mode")) {
            noteBody.firstElementChild.innerText =
                noteBody.lastElementChild.value;
        } else {
            noteBody.lastElementChild.focus();
        }
    } else if (
        target.classList.contains("remove") ||
        target.classList.contains("fa-times")
    ) {
        let noteDiv = target.parentNode;
        while (!noteDiv.classList.contains("note-div")) {
            noteDiv = noteDiv.parentNode;
        }
        console.log(noteDiv, noteDiv.parentNode);
        container.removeChild(noteDiv);
    }
}
