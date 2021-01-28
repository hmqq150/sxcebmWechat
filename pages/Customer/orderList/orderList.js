// pages/Customer/orderList/orderList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[]
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
    //发送之前
    console.log("brfore sendRq")

    console.log(this.data)
    var that = this;
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getOrderListForFinDelivery',
      data: {
        id: app.globalData.userInfo.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log("-=-=-=-=-=-=")
        console.log("after sendRq ")
        var code = res.data.error_code
        if (code == 0) {
          console.log(res.data)
          console.log("successful")
          that.setData({
            lists: res.data.data
          })

          console.log(that.data.lists)
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
  goBack: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../goBackPage/goBackPage?orderId='+e.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  confirm:function(e){
    console.log(e)
    // e.currentTarget.id
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/dealOrderForFinDelivery',
      data: {
        id: app.globalData.userInfo.userId,
        orderId: e.currentTarget.id,
        tag: 0,
        message: "qqq"

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
            content: '确认成功',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                  delta: 1,
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.navigateBack({
                  delta: 1,
                })
              }
            }
          })

        } else {
        }
      }
    })

  }
})