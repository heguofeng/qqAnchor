// pages/apply/apply.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageSource:"",//页面来源
    counts:5,//购物车数量
    animationData:{}, //动画数据
    goodsId:"",  //商品id
  },
  gotoIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  gotoCarts:function(){
    wx.navigateTo({
      url: '../shoppingCarts/shoppingCarts',
    })
  },
  addToCarts:function(){
    let counts=this.data.counts;
    counts++;

    var animation=wx.createAnimation({
      duration:1000,
      timingFunction:"ease",
    });
    this.animation=animation;
    animation.translateY(-20).opacity(1).step()
    animation.translateY(-20).opacity(0).step({ duration: 1000 })
    animation.translateY(0).step({duration:0})
    this.setData({
      counts:counts,
      animationData: animation.export(),
    })
    wx.showToast({
      title: '加入购物车成功',
      icon:"none"
    });

  },
  gotoOrderDetail:function(e){
    let goodsId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?goodsId=' + goodsId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      pageSource: options.type,
      goodsId:options.id
    })
    let pageSource = this.data.pageSource;
    if (pageSource=="course"){
      wx.setNavigationBarTitle({
        title: '精品课程',
      })
    } else if (pageSource=="camp"){
      wx.setNavigationBarTitle({
        title: '冬夏令营',
      })
    } else if (pageSource == "activity") {
      wx.setNavigationBarTitle({
        title: '活动排期',
      })
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