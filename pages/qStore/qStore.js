// pages/courses/courses.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  gotogoodsDetail: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + id,
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/goods',
      success: (res) => {
        // console.log(res.data)
        wx.hideLoading();
        this.setData({ goods: res.data.data.goods })
      }
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/goods',
      success: (res) => {
        console.log(res.data)
        this.setData({ goods: res.data.data.goods })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})