// pages/Customer/orderList/orderList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: "",
    foodId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getFoodForWait',
      data: {
        id: app.globalData.userInfo.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log("-=-=-=-=-=-=")
        console.log("after sendRq")
        var code = res.data.error_code
        if (code == 0) {
          console.log("successful")
          that.setData({
            lists: res.data.data
          })
        } else {
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  kaipingApply: function(e) {
    wx.navigateTo({
      url: '../KaiPingApply/KaiPingApply?foodId=' + e.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  submitForm: function(e) {
    console.log(e)
    var that = this
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/foodOutComplete',
      data: {
        id: app.globalData.userInfo.userId,
        foodId: e.currentTarget.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log("-=-=-=-=-=-=")
        console.log("after sendRq")
        var code = res.data.error_code
        if (code == 0) {
          console.log("successful")
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  }
})