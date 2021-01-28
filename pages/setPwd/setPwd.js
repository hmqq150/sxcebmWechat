// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName: "",
    userInputPwd: "",
    showPop: false,
    userInputPwdComfirm: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      realName: app.globalData.userInfo.realName
    })
    console.log(this.data.realName)
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

  },
  submitForm: function (e) {
    console.log(e)
    var that = this
    if((this.data.userInputPwd=="")){
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "密码不可为空"
      })
    }else if ((this.data.userInputPwd != this.data.userInputPwdComfirm)) {
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "两次输入的密码不一致"
      })
    } else {
      //发起网络请求
      wx.request({
        url: app.globalData.ipAddress + app.globalData.proName + '/setPwd',
        data: {
          userId: app.globalData.userInfo.userId,
          //phonenumber: e.detail.value.username,
          password: that.data.userInputPwd
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success(res) {
          console.log("-=-=-=-=-=-=")
          console.log("============================setPwd==============================")

          if (res.data.error_code == 0) {
            //successful
            console.log(res.data.data)
            wx.showModal({
              showCancel: false,
              title: "提示",
              content: "修改密码成功 请重新登录",
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  //tiaozhuan login
                  // wx.navigateTo({
                  //   url: '../login/login'
                  // })
                  wx.reLaunch({
                    url: '../login/login'
                  })
                }
              }
            })
          }
          console.log("============================setPwd==============================")

          // I am global data
          // console.log(appInstance.globalData.userInfo.data.identityId)
          //进行跳转


          // appInstance.globalData.hasLogined = true
          // wx.switchTab({
          //   url: "/pages/index/index",
          // })

        }
      })
    }
  },
  formInputChange: function (e) {
    console.log(e)
    this.setData({
      userInputPwd: e.detail.value
    })
  },
  formInputChangeComfirm: function (e) {
    console.log(e)
    this.setData({
      userInputPwdComfirm: e.detail.value
    })
  },
  cancel: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  }
})
