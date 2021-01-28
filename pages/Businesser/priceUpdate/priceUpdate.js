
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {

    list: [{
      id: 'password',
      name: '修改密码'
    }],
    caigouPrice: 0,
    money: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    console.log(app.globalData)

    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getPriceUpdate',
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
            list: res.data.data.data
          })

        } else { }
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
    var that = this;
    // //清除计时器  即清除setInter
    // clearInterval(that.data.setInter)

    if (this.data.isWsStarted) {
      that.setData({
        isWsStarted: false
      })
      wx.closeSocket()
    }
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo.base = e.detail.userInfo
    this.setData({
      userInfoLocal: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  submitForm(e) {
    // this.selectComponent('#form').validate((valid, errors) => {
    //   console.log('valid', valid, errors)
    //   if (!valid) {
    //     const firstError = Object.keys(errors)
    //     if (firstError.length) {
    //       this.setData({
    //         error: errors[firstError[0]].message
    //       })

    //     }
    //   } else {
    //     wx.showToast({
    //       title: '校验通过'
    //     })
    //   }
    // })
    // this.selectComponent('#form').validateField('mobile', (valid, errors) => {
    //     console.log('valid', valid, errors)
    // })


  },
  formNumber: function (e) {
    console.log(e.detail.value)
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  kindToggle(e) {
    console.log("1111111111111111111212121")
    console.log(e)
    console.log("1111111111111111111212121")

    // const id = e.currentTarget.id
    // const list = this.data.list
    // for (let i = 0, len = list.length; i < len; ++i) {
    //   if (list[i].id === id) {
    //     list[i].open = !list[i].open
    //   } else {
    //     list[i].open = false
    //   }
    // }
    // this.setData({
    //   list
    // })
    // wx.reportAnalytics('click_view_programmatically', {})

    switch (e.currentTarget.id) {
      case "password":
        wx.navigateTo({
          url: '../setPwd/setPwd',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        break;
      case "setAccountValue":
        wx.navigateTo({
          url: '../Financialer/BzZyAdd/BzZyAdd',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        break;
    }
  },
  loadWebsoc: function () {
    var that = this
    //websocket
    let socketOpen = this.isWsStarted
    var socketMsgQueue = []
    // var ipWbAddress = "ws://192.168.0.111:8081";
    var ipWbAddress = app.globalData.wbIpAddress;

    var proName = app.globalData.proName;

    var userId = app.globalData.userInfo.userId
    console.log("--------------websocketpackage--------------")
    console.log(app.globalData.userInfo)
    console.log(ipWbAddress +
      proName +
      '/websocketServer/{' + userId + '}')

    console.log("--------------websocketpackage--------------")

    wx.connectSocket({
      url: ipWbAddress +
        proName +
        '/websocketServer/{' + userId + '}',
      header: {
        'content-type': 'application/json'
      },
    })

    wx.onSocketOpen(function (res) {
      socketOpen = true
      that.setData({
        isWsStarted: true
      })
      // //关闭定时器 防止反复轮询
      // clearInterval(that.data.setInter)

      for (let i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []

      wx.onSocketMessage(function (res) {
        console.log("------来自服务器的问候------")
        console.log(res)
        console.log("------来自服务器的信息------")
        wx.showModal({

          title: '提示',

          content: res.data,

          success: function (res) {
            if (res.confirm) { //这里是点击了确定以后

              console.log('用户点击确定')
            }
            else {//这里是点击了取消以后

              console.log('用户点击取消')

            }
          }

        })
      })
      wx.onSocketClose(function (res) {
        console.log('WebSocket 已关闭！')
      })
    })

    function sendSocketMessage(msg) {
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }
  },
  // startSetInter: function() {
  //   var that = this;
  //   //将计时器赋值给setInter
  //   that.data.setInter = setInterval(
  //     function() {
  //       var numVal = that.data.num + 1;
  //       that.setData({
  //         num: numVal
  //       });
  //       console.log('setInterval==' + that.data.num);
  //       if ((app.globalData.hasLogined) && (!that.data.isWsStarted)) {
  //         //开启websocket
  //         that.loadWebsoc()
  //       }
  //     }, 2000);
  // },
  kindToggle: function (e) {
    console.log("========================")
    console.log(e)
    console.log("========================")
    var caigouPrice = this.data.list[e.currentTarget.id].caigouPrice

    this.setData({
      showw: true,
      caigouPrice: caigouPrice,
      currIndex: e.currentTarget.id,
      gangNo: this.data.list[e.currentTarget.id].gangNo
    })

  },
  formInputChange: function (e) {
    console.log(e)
    this.setData({
      money: e.detail.value
    })
  },
  btnconfirm: function () {

    var that = this
    //http submit
    //发起网络请求
    if (this.data.money != "") {
      wx.request({
        url: app.globalData.ipAddress + app.globalData.proName + '/submitFPrice',
        data: {
          id: app.globalData.userInfo.userId,
          foodId: that.data.list[that.data.currIndex].id,
          value: that.data.money
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
              money: ""
            })
            wx.navigateBack({
              delta: 1,
              success: (res) => { },
              fail: (res) => { },
              complete: (res) => { },
            })
          } else if (code == 1) {
            wx.showModal({
              title: "提示",
              content: "商户保值数额不够，请先保证保值余额充足",
              showCancel: false
            })
          }
        }
      })
    }
  }
})