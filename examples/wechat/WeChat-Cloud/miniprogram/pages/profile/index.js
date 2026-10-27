const app = getApp();

Page({
  data: {
    list: [1, 2, 3, 4, 5]
  },
  onLoad: function () {
    console.log(this.data.list);
  },
  routerNavAction: function () {
    console.log(this.pageRouter);
  }
});
