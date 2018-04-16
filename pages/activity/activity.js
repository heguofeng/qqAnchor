// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:"1",//当前月份状态值
    activitys:[]
  },
  switchNav:function(e){
    // console.log(e)
    let id=e.currentTarget.dataset.id;
    let flag=this.data.flag;
    if(flag==id){
      return;
    }else{
      flag=id;
    }
    this.setData({
      flag:flag
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/activitys',

      success: res => {
        wx.hideLoading()
        this.setData({
          activitys: res.data.data.activitys
        })
      }
    })
  },
  gotocoursesDetails:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../coursesDetails/coursesDetails?type=activity&id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/activitys',

      success:res=>{
        wx.hideLoading()
        this.setData({
          activitys:res.data.data.activitys
        })
      }
    })
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