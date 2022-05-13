##### Blurry Loading，模糊缓慢加载一张图片

- 使用带`preload`属性`link`标签预加载这张非常大的图片

  ```html
  <link
      rel="preload"
      href="https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2040&q=80"
      as="image"
  />
  ```

* 使用`filter`中的`blur`方法来设置图片的模糊程度，即多少像素会合并为一个

  ```css
  body {
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
  }
  
  .container {
      position: absolute;
      top: -50px;
      left: -50px;
      height: calc(100vh + 100px);
      width: calc(100vw + 100px);
      background: center center / cover no-repeat
          url("https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2040&q=80");
      filter: blur(50px);
  }
  
  .timer {
      display: none;
      font-size: 60px;
      color: #eee;
  }
  ```

  同时使用`flex`布局来保证`.timer`这个加载程度字体水平垂直居中，有趣的一点是由于.`container`的定位是`absolute`导致这个元素并不符合`flex`布局

* 使用`requestAnimationFrame`来设置这个动画过程，同时通过`RAF`给回调函数传入的高精度的调用时间戳来计算每次每一帧调用的时间间隔。保证至少隔`30ms`才执行一次回调逻辑

  同时保证加载完了图片之后才开始动画。

  ```js
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
  ```

  