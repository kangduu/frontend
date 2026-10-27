const EventEmitter = require("node:events");

class Timer extends EventEmitter {
  start(seconds) {
    console.log(`开始倒计时 ${seconds} 秒`);

    let count = seconds;

    const interval = setInterval(() => {
      console.log(count);

      count--;

      if (count <= 0) {
        clearInterval(interval);
        this.emit("done");
      }
    }, 1000);
  }
}

const timer = new Timer();
timer.on("done", () => console.log("倒计时结束！"));

timer.start(5);
