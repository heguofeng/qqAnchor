// pages/courses/courses.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    courses:[],
    pageSource:"",  //页面来源
  },
  gotocoursesDetails:function(e){
    var id=e.currentTarget.dataset.id;
    let pageSource = this.data.pageSource;//判断一下页面访问来源
    wx.navigateTo({
      url: '../coursesDetails/coursesDetails?type=' +pageSource+'&id='+id,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    wx.showLoading({
      title: '加载中...',
    })
    let pageSource = options.type;
    this.setData({
      pageSource: pageSource
    })
    //根据options传进的type值进行判断。是精品课程页面还是冬夏令营页面
    if(options.type=="course"){
      wx.setNavigationBarTitle({
        title: '精品课程',
      });
      wx.request({
        url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/courses',
        success: (res) => {
          // console.log(res.data)
          wx.hideLoading()
          this.setData({ courses: res.data.data.courses })
        }
      });
    }else if(options.type=="camp"){
      wx.setNavigationBarTitle({
        title: '冬夏令营',
      });
      wx.request({
        url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/camp',
        success: (res) => {
          // console.log(res.data)
          wx.hideLoading()
          this.setData({ courses: res.data.data.camp })
        }
      });
    }

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