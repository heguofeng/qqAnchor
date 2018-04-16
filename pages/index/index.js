//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls:[
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg',
      '/images/4.jpg',
    ],
    news:[],  //新闻列表
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //精品课程
  gotoCourses:function(){
    wx.navigateTo({
      url: '../courses/courses?type=course',
    })
  },
  //冬夏令营
  gotoCamp: function () {
    wx.navigateTo({
      url: '../courses/courses?type=camp',
    })
  },
  //活动排期
  gotoActivity: function () {
    wx.navigateTo({
      url: '../activity/activity',
    })
  },
  //小Q商城
  gotoQstore: function () {
    wx.navigateTo({
      url: '../qStore/qStore',
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/index',
      success:res=>{
        wx.hideLoading()
        this.setData({
          news:res.data.data.news
        })
      }
    })
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/index',
      success: res => {
        wx.hideNavigationBarLoading();
        this.setData({
          news: res.data.data.news
        })
        wx.stopPullDownRefresh();
      }
    })
  }
})
