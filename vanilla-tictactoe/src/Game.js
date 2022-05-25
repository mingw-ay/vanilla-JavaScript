export default class Game {
    constructor(container) {
        this.container = container;
        this.histories = [
            new Array(3).fill(0).map((cell) => new Array(3).fill(0)),
        ];
        this.curHistoryIndex = 0;
        /* 当前下的棋子类型 */
        this.nextPlayer = "X";
        this.onMove = this.onMove.bind(this);
        this.gotoState = this.gotoState.bind(this);
        /* 当前是否胜方 */
        this.won = false;
    }

    init() {
        this.board = document.createElement("div");
        const detailDiv = document.createElement("div");
        detailDiv.classList.add("detail");
        detailDiv.innerHTML = `<div class="status">Next Run: X</div>
                                <div class="histories"><div>1.<button class="goto">Goto State No.1</button></div></div>`;
        this.statusDiv = detailDiv.querySelector(".status");
        this.historiesDiv = detailDiv.querySelector(".histories");
        this.board.classList.add("board");
        this.board.innerHTML = this.getBoard();
        this.container.appendChild(this.board);
        this.container.appendChild(detailDiv);

        /* 添加事件监听 */
        this.board.addEventListener("click", this.onMove);
        this.historiesDiv.addEventListener("click", this.gotoState);
    }

    getBoard() {
        let curHistory = this.histories[this.curHistoryIndex];
        let htmlStr = "";
        for (let i = 0; i < 3; i++) {
            /* 拼接每一行 */
            htmlStr += "<div class='row'>";
            for (let j = 0; j < 3; j++) {
                switch (curHistory[i][j]) {
                    case -1: {
                        htmlStr += `<div class='cell' data-index='${i},${j}'>X</div>`;
                        break;
                    }
                    case 0: {
                        htmlStr += `<div class='cell' data-index='${i},${j}'></div>`;
                        break;
                    }
                    case 1: {
                        htmlStr += `<div class='cell' data-index='${i},${j}'>O</div>`;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            htmlStr += "</div>";
        }
        return htmlStr;
    }

    // 落子
    onMove(e) {
        let target = e.target;
        if (
            this.won === false &&
            target !== this.board &&
            target.innerText === ""
        ) {
            /* 如果当前所在的历史index比histories数组的总长度要小，说明要先去除一部分 */
            let len = this.histories.length;
            if (this.curHistoryIndex < len - 1) {
                /* 直接更新长度 */
                len = this.curHistoryIndex + 1;
                this.histories.length = len;
                /* 先删除多余的按钮 */
                while (this.historiesDiv.childElementCount > len) {
                    this.historiesDiv.removeChild(
                        this.historiesDiv.lastElementChild
                    );
                }
            }

            /* 更新视图 */
            target.innerText = this.nextPlayer;
            this.historiesDiv.innerHTML += `<div>${
                len + 1
            }.<button class='goto'>Go to move No.${len + 1}</button></div>`;

            /* 新增历史，注意克隆 */
            const curHistory = this.histories[this.curHistoryIndex];
            const newHistory = curHistory.map((row) => [...row]);
            /* 拿到所在坐标 */
            const index = target.dataset.index.split(",");
            newHistory[index[0]][index[1]] = this.nextPlayer === "X" ? -1 : 1;
            this.histories.push(newHistory);
            this.curHistoryIndex++;
            /* 判断是否有胜方 */
            if (this.judgeWinner() === true) {
                this.statusDiv.innerHTML = `${this.nextPlayer} is the Winner!`;
                this.won = true;
            } else {
                /* 更新nextPlayer */
                this.nextPlayer = this.nextPlayer === "X" ? "O" : "X";
                this.statusDiv.innerText = `Next Run:${this.nextPlayer}`;
            }
        }
    }

    // 跳转到之前的状态
    gotoState(e) {
        const target = e.target;

        if (target !== this.historiesDiv) {
            /* 得到点击的编号 */
            const buttons = this.historiesDiv.querySelectorAll(".goto");
            const index = [...buttons].indexOf(target);

            /* 更新board为之前的状态 */
            if (index !== this.curHistoryIndex) {
                this.curHistoryIndex = index;
                this.board.innerHTML = this.getBoard();

                this.won = false;
                /* 同时更新nextPlayer,偶数则为X*/
                if ((index & 1) === 1) {
                    this.nextPlayer = "O";
                } else {
                    this.nextPlayer = "X";
                }
                this.statusDiv.innerText = `Next Run ${this.nextPlayer}`;

                /* 如果index变到了最后一个位置，判断是否出现了胜方 */
                if (
                    index === this.histories.length - 1 &&
                    this.judgeWinner() === true
                ) {
                    this.won = true;
                    const winner = this.nextPlayer === "X" ? "O" : "X";
                    this.statusDiv.innerText = `${winner} is the Winner!`;
                }
            }
        }
    }

    // 判断当前是否某一方赢了
    judgeWinner() {
        const curHistory = this.histories[this.curHistoryIndex];

        /* 统计三行三列以及两条交叉线的和 */
        const sumArr = new Array(8).fill(0);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                /* 所在的和 */
                sumArr[i] += curHistory[i][j];
                /* 所在列的和 */
                sumArr[3 + j] += curHistory[i][j];
                /* 右斜行 */
                if (i - j === 0) {
                    sumArr[6] += curHistory[i][j];
                }
                /* 左斜行 */
                if (i + j === 2) {
                    sumArr[7] += curHistory[i][j];
                }
            }
        }

        return sumArr.some((sum) => sum === 3 || sum === -3);
    }
}
