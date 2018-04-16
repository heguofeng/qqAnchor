// components/addCarts/addCarts.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    counts:{  //属性名
      type:Number, //类型
      value:3  //默认初始值
    },
    goodsId:{
      type: Number, //类型
      value: 3  //默认初始值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData:{} //动画
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoIndex: function () {
      wx.switchTab({
        url: '../index/index',
      })
    },
    gotoCarts: function () {
      wx.navigateTo({
        url: '../shoppingCarts/shoppingCarts',
      })
    },
    addToCarts: function () {
      let counts = this.data.counts;
      counts++;

      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: "ease",
      });
      this.animation = animation;
      animation.translateY(-20).opacity(1).step()
      animation.translateY(-20).opacity(0).step({ duration: 1000 })
      animation.translateY(0).step({ duration: 0 })
      this.setData({
        counts: counts,
        animationData: animation.export(),
      })
      wx.showToast({
        title: '加入购物车成功',
        icon: "none"
      });

    },
    gotoOrderConfirm: function (e) {
      let goodsId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../orderConfirm/orderConfirm?goodsId=' + goodsId,
      })
    },
  }
})
