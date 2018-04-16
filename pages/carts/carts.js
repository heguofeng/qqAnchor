// pages/carts/carts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],//购物车
    totalPrice: "0", //总价格
    allCounts: "0",      //总数量
    allSelectedStatus: false,//全选状态
    editStatus: false,  //右上角编辑的状态
    editText: "编辑商品", //完成或者 编辑？
    animationData:{},  //动态添加动画事件
  },
  //获取总价格,变化结算按钮的状态
  getTotalPrice: function() {
    let carts = this.data.carts; // 获取购物车列表
    let totalPrice = 0;
    let allCounts = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        totalPrice += carts[i].price * carts[i].num;
        allCounts++;
      }
    }
    this.setData({
      carts: carts,
      totalPrice: totalPrice.toFixed(2), //四舍五入两位小数点
      allCounts: allCounts,
    })
  },
  //选择事件
  selectList: function (e) {
    let index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let selected = carts[index].selected;
    carts[index].selected = !selected; //更改
    this.setData({
      carts: carts,
    });
    this.getTotalPrice();
  },
  //全选
  allSelected: function () {
    let carts = this.data.carts;
    let allSelectedStatus = this.data.allSelectedStatus;
    allSelectedStatus = !allSelectedStatus;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = allSelectedStatus;
    }
    this.setData({
      carts: carts,
      allSelectedStatus: allSelectedStatus,
    })
    this.getTotalPrice();
  },
  //增加数量
  addCount: function (e) {
    let index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num >= 199) {
      wx.showToast({
        title: '不能购买更多啦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    num += 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    })
    this.getTotalPrice();
  },
  //减少数量
  minusCount: function (e) {
    let index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      wx.showToast({
        title: '减少已经到底啦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    num -= 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    })
    this.getTotalPrice();
  },
  //直接修改数量
  changeNum: function (e) {
    let index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    if (e.detail.value <= 199 && e.detail.value >= 1) {
      carts[index].num = parseInt(e.detail.value)
      this.setData({
        carts: carts
      })
    } else {
      wx.showToast({
        title: '数量超出范围，需要在1-199之间',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        carts: carts
      })
      return false;
    }
    this.getTotalPrice();
  },
  edit: function () {
    let editStatus = this.data.editStatus;
    editStatus = !editStatus;
    if (editStatus) {
      let animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease",
        delay: 0
      });
      this.animation = animation;
      animation.opacity(1).translateX(225).step();

      let editText = "完成";
      this.setData({
        editText: editText,
        editStatus: editStatus,
        animationData: animation.export(),
      })
    } else {
      let animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease",
        delay: 0
      });
      this.animation = animation;
      animation.opacity(0.5).translateX(0).step();

      let editText = "编辑商品";
      this.setData({
        editText: editText,
        editStatus: editStatus,
        animationData: animation.export(),

      })
    }
  },
  //删除购物车
  //这里使用了数组的push有效值方法代替删除
  delete: function () {
    let allCounts=this.data.allCounts;
    if (allCounts>0){
      wx.showModal({
        content: '确认删除已选中的'+this.data.allCounts+'项课程?',
        confirmText: "删除",
        confirmColor: "#f51e48",
        success: (res) => {
          if (res.confirm) {
            let arr = [];//生成一个新的push数组
            let carts = this.data.carts;
            for (let i = 0; i < carts.length; i++) {
              if (!carts[i].selected) {
                arr.push(carts[i])
              }
            }
            this.setData({
              carts: arr
            });
            this.getTotalPrice();
          } else if (res.cancel) {
            return;
          }
        }
      });
    }else{
      wx.showToast({
        title: '没有选择任何课程',
        icon:"none",
        duration:2000
      });
    }
  },

  //去结算
  gotoOrderConfirm:function(){
    let carts=this.data.carts;
    let selectedArr=[];
    for(let i=0;i<carts.length;i++){
      if(carts[i].selected){
        selectedArr.push(i)
      }
    }
    wx.navigateTo({
      url: '../orderConfirm/orderConfirm?goodsId='+selectedArr,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5acf093c392ec34f5769950f/dazwang/carts',
      success: res => {
        if (res.data.success) {
          wx.hideLoading()
          this.setData({
            carts: res.data.data.carts
          })
          this.getTotalPrice();
        }
      }
    })
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
