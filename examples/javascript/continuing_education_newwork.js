window.continuing_education = (function () {
  if(window.continuing_education) {
    window.continuing_education.removeTimer()
  }
  class ContinuingEducation {
    constructor() {
      this.cache = {
        styied: "",
      };
      this.timer = {};
    }
    /**
     * 定时器
     * @param {Function} fn 传入的函数
     * @param {number} time 传入的时间，同setTimeout
     */
    util_interval(func, time, ...args) {
      if (!func instanceof Function) {
        throw Error("[util_interval] func must be a function!");
      }
      const _this = this;
      const _time = typeof time === "number" ? time : 5000;
      _this.timer[func.name] = setTimeout(() => {
        const submited = func.call(null, args);
        clearTimeout(_this.timer[func.name]);
        _this.timer[func.name] = null; // 释放内存
        if (!submited) {
          this.util_interval(func, time, ...args);
        }
      }, _time);
    }

    // autoplay when paused
    autoplayWhenPaused() {
      const video = document.querySelectorAll("video")[0];
      if (video) {
        video.addEventListener("pause", () => {
          video.play();
        });
      } else {
        console.error("获取视频元素失败，请检查脚本是否正确加载！");
      }
    }

    // code verification
    submitCode() {
      try {
        const ele_modal = document.querySelector(
          ".layui-layer.layui-anim.layui-layer-page"
        );
        if (!ele_modal) return false;

        const ele_code = document.querySelector(".layui-layer #checkCode");
        const ele_input = document.querySelector(".layui-layer #yz");
        const ele_submit = document.querySelector(".layui-layer .yzsubmit");
        if (ele_code && ele_input && ele_submit) {
          ele_input.value = ele_code.innerHTML;
          if (ele_submit.click instanceof Function) {
            ele_submit.click();
            return true;
          } else return false;
        } else return false;
      } catch (error) {
        console.error("[submitCode] error:", error);
        return true;
      }
    }

    // listen to the time change
    timeChanged() {
      try {
        const ele_video_delay = document.querySelector(".video-delay");
        if (!ele_video_delay) {
          console.error("[timeChanged] no video-delay element");
          return true;
        }

        const ele_styied = document.querySelector(
          ".video-delay #Lbl_Time .ts_color:last-of-type"
        );
        if (ele_styied) {
          if (this.cache.styied === ele_styied.innerHTML) {
            // todo reload
          }
          this.cache.styied = ele_styied.innerHTML;
        }
        return false;
      } catch (error) {
        console.error("[timeChanged] error:", error);
        return true;
      }
    }

    // overload: 重载 window.confirm 和 window.alert
    overloadConfirmAndAlert() {
      window.confirm = function () {
        return true;
      };
      window.alert = function () {
        return true;
      };
    }

    running() {
      this.autoplayWhenPaused();
      this.overloadConfirmAndAlert();
      this.util_interval(this.submitCode.bind(this, 5000));
      // this.util_interval(this.timeChanged.bind(this, 8000));
    }

    removeTimer() {
      try {
        const timers = Object.keys(this.timer);
        if (timers.length > 0) {
          timers.forEach((key) => {
            clearTimeout(this.timer[key]);
            this.timer[key] = null;
          });
        }
      } catch (error) {
        console.error("[removeTimer] error:", error);
      }
    }
  }
  const education = new ContinuingEducation();
  education.running();
  return education;
})();
