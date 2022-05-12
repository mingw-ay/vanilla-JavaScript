/* 将其作为一个类 */
class ExpandCards {
    constructor(cardsInfo) {
        this.cardsInfo = cardsInfo;
        /* 拿到对应DOM对象 */
        this.expandingCards =
            document.getElementsByClassName("expanding-cards")[0];
        this.cardList = this.expandingCards.getElementsByClassName("panel");
        /* 当前活跃卡片索引 */
        this.index = 0;
    }

    /* 初始化方法 */
    init() {
        this.expandingCards.innerHTML = this.cardsInfo.reduce(
            (prev, cur) =>
                prev +
                `<div class="panel" style = "background: center center / cover no-repeat url('${cur.url}')"><h3 class="info">${cur.specifics}</h3></div>`,
            ""
        );
        this.cardList[0].classList.add("active");
        this.cardList[0].firstElementChild.style.display = "block";

        /* 添加事件监听 */
        this.expandingCards.addEventListener("click", (e) => {
            /* 修改事件监听函数的this指向 */
            this.clickOnCard.call(this, e);
        });
    }

    /* 监听整个expandingCards的Dom对象 */
    clickOnCard(e) {
        let target = e.target;
        if (target !== this.expandingCards) {
            /* 如果索引改变了则修改active对象 */
            let targetIndex = Array.from(this.cardList).indexOf(target);
            if (targetIndex !== this.index) {
                this.index = targetIndex;
                this.transformTo();
            }
        }
    }

    transformTo() {
        /* 修改active对象 */
        for (const card of this.cardList) {
            if (card.classList.contains("active")) {
                card.classList.remove("active");
                card.firstElementChild.style.display = "none";
            }
        }
        this.cardList[this.index].classList.add("active");
        /* 1s后展示文字 */
        setTimeout(() => {
            this.cardList[this.index].firstElementChild.style.display = "block";
        }, 1000);
    }
}
