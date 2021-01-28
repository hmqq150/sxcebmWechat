// pages/Customer/DealProfit/DealProfit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    companyName: "",
    createData: "",
    profit: "",
    foodData: [],
    tag: false,
    value: 0,
    finalValueId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getLastBatch',
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
            list: res.data.data,
            companyName: res.data.data.companyName,
            createData: res.data.data.createData,
            // profit:res.data.data.profit,
            foodData: res.data.data.foodData,
            value: res.data.data.value,
            finalValueId:res.data.data.finalValueId
          })
          if (res.data.data.status == 1) {
            that.setData({
              tag: true,
              str: "请等待后台计算利息"
            })
          } else if(res.data.data.status ==2){
            that.setData({
              tag: false,
              str: "请输入本次打款金额"
            })
          }else if(res.data.data.status == 3){
            that.setData({
              tag: true,
              str: "请等待财务人员反馈"
            })
          }
        } else {
        }
      }
    })
  
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
  formInputChange: function (e) {
    console.log(e)
    this.setData({
      money: e.detail.value
    })

  },
  submit: function (e) {
    var that = this
    if (Number(this.data.money) < Number(this.data.value)) {
      //打钱太少不给发货
      wx.showModal({
        title: '提示',
        content: '输入的金额数请至少大于本次应付金额数',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')

          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })

    } else {
      //发起网络请求
      wx.request({
        url: app.globalData.ipAddress + app.globalData.proName + '/submitLastMoney',
        data: {
          id: app.globalData.userInfo.userId,
          finalValueId:that.data.finalValueId,
          money: that.data.money
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
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
          } else {
          }
        }
      })
    }


  }
})