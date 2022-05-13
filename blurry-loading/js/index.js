let container, timerText;
window.addEventListener("load", () => {
    container = document.querySelector(".container");
    timerText = document.querySelector(".timer");
    timerText.style.display = "block";
    let percentage = 0;
    let prev = 0;
    function blurring(now) {
        /* 至少30ms再执行 */
        if (now - prev > 30) {
            percentage++;
            timerText.innerText = `${percentage}%`;
            timerText.style.opacity = `${((100 - percentage) * 1) / 100}`;
            container.style.filter = `blur(${
                ((100 - percentage) * 50) / 100
            }px)`;
            prev = now;
        }
        if (percentage < 100) {
            requestAnimationFrame(blurring);
        }
    }
    requestAnimationFrame(blurring);
});
