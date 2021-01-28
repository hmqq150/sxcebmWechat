// pages/Customer/goBackPage/goBackPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderId:0,
      message:"",
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId
    })
    console.log(options)
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
  input:function(e){
    console.log(e)
    console.log(e.detail.value)
    var leng = e.detail.value
    this.setData({
      message: e.detail.value,
      count :leng.length
})
  },
  goBackForm:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  submitForm:function(){

    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/dealOrderForFinDelivery',
      data: {
        id: app.globalData.userInfo.userId,
        orderId: that.data.orderId,
        tag: 1,
        message: that.data.message
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
          wx.showModal({
            title: '提示',
            content: '退回成功',
          })
        } else {
        }
      }
    })



    wx.navigateBack({
      delta: 1,
    })
  }
})