// index.js
const app = getApp()

Page({
  data: {
    imgURL: "",
    videoUrl: "",
  },
  onLoad: function () { },

  upload() {
    var myDate = new Date();
    let time = myDate.getTime();
    const _this = this;
    wx.chooseMedia({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      mediaType: ['image', 'video'],
      success({ type, tempFiles: [file] }) {
        console.log(file.tempFilePath)
        _this.setData({ imgURL: file.tempFilePath })
        // wx.previewMedia({
        //   sources: [{
        //     url: file.tempFilePath,
        //     type
        //   }],
        //   showmenu: true,
        // })
        //   wx.cloud.uploadFile({
        //     cloudPath: time + '.png',
        //     filePath: res.tempFilePaths[0],
        //     success: res => {
        //       console.log("上传成功", res);
        //     },
        //     fail: console.error
        //   })
      },
      fail(err) {
        console.log(err)
      },
      complete() {

      }
    })
  },
});  