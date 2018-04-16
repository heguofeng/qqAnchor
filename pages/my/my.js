// pages/my/my.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},//登录信息
    hasUserInfo:false,//获取登录状态
    btnType:null, //按钮类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }else{
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success:res=>{
          app.globalData.userInfo=res.userInfo;
          this.seData({
            userInfo:res.userInfo,
            hasUserInfo:true
          })
        }
      })
    }
  },
  //获取登录信息
  getUserInfo:function(e){
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope

    let that=this;
    wx.getSetting({
      success(res) {
        //判断有没有用户信息权限
        if (!res.authSetting['scope.userInfo']) {
          console.log("没有权限")
          wx.showModal({
            title: '',
            content: '检测到您没有打开用户信息权限，是否去设置打开？',
            confirmColor:'#f51e48',
            success:(res)=>{
              if(res.confirm){
                //打开设置界面
                wx.openSetting({
                  success(res) {
                    console.log(res)
                  }
                })
              }else{
                return
              }
            }
          })
        }else{
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      }
    })
  },
  //退出账户
  loginOut:function(){
    wx.showModal({
      title: '',
      content: '确定退出您的账户？',
      confirmColor:'#f51e48',
      success:res=>{
        if(res.confirm){
          app.globalData.userInfo = null;
          this.setData({
            userInfo: null,
            hasUserInfo: false
          })
        }else{
          return;
        }
      }
    })

  },
  switchMenu:function(e){
    let currentType = e.currentTarget.dataset.type;
    // console.log(currentType)
    let btnType=this.data.btnType;
    if (btnType==currentType){
      return;
    }else{
      btnType=currentType;
    }
    this.setData({
      btnType:btnType
    })
    //进行跳转
    switch (currentType){
      case "anchor":
        wx.showToast({
          title: '我是小主播',
        });
        break;
      case "growthRecords":
        wx.showToast({
          title: '成长记录',
        });
        break;
      case "myConcern":
        wx.showToast({
          title: '我的关注',
        });
        break;
      case "purchaseRecords":
        wx.showToast({
          title: '购买记录',
        });
        break;
      case "rankList":
        wx.showToast({
          title: '排行榜',
        });
        break;
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
    this.setData({
      btnType:null
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