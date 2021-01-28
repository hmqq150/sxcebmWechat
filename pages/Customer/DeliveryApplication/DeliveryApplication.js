// pages/Customer/DeliveryApplication/DeliveryApplication.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    foodNoList: [],
    sss: "",
    showw: false,
    totalMoney: 0,
    money: [],
    orderId: 0,
    isShow: false
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
      url: app.globalData.ipAddress + app.globalData.proName + '/getFoodList',
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/hasLastBatch',
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

          if (res.data.data.hasLastBatch == 1) {
            that.setData({
              isShow: true
            })
          }
        } else {
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

  },
  goBack: function () {
    wx.navigateTo({
      url: '../goBackPage/goBackPage',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  confirm: function (e) {

    console.log(e)

    if (this.data.foodNoList.length == 0) {
      wx.showModal({
        title: '提示',
        content: '当前未选择货物',
      })
    } else {
      //发送之前
      console.log("brfore sendRq")
      console.log(this.data)
      console.log(e.currentTarget.id)
      var that = this
      //发起网络请求
      wx.request({
        url: app.globalData.ipAddress + app.globalData.proName + '/isLastBatch',
        data: {
          id: app.globalData.userInfo.userId,
          orderId: that.data.orderId,
          count: that.data.foodNoList.length,
          list: that.data.foodNoList
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success(res) {
          console.log("-=-=11111111111111-=-=-=-=")
          console.log("after sendRq");
          var finalId = res.data.data.finalId
          console.log(res.data)

          if (!res.data.data.isLast) {

            that.setData({
              showw: true
            })
            console.log("successful")

          } else {
            //最后一次提货
            wx.showModal({
              title: '提示',
              content: '等待财务人员进行利息核算',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }
  },
  btnconfirm: function (e) {
    this.setData({
      showw: false
    })
    var money = this.data.money

    if (money < this.data.totalMoney) {
      console.log("这点钱就想买东西")
      wx.showModal({
        title: '提示',
        content: '金额不足支付本次货物价格 请重新输入',
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
        url: app.globalData.ipAddress + app.globalData.proName + '/pushFoodOut',
        data: {
          id: app.globalData.userInfo.userId,
          foodNoList: this.data.foodNoList,
          money: money
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

              content: '出货申请已提交，请耐心等待',

              success: function (res) {
                if (res.confirm) { //这里是点击了确定以后

                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              }

            })
          } else { }
        }
      })

    }
  },

  checkboxChange: function (e) {
    console.log(e)
    console.log(this.data.lists)
    var listLocal = this.data.lists
    console.log(listLocal)
    // for (let i = 0; i < listLocal.length; i++) {
    //   listLocal[i].checked = false
    //   for (let j = 0; j < e.detail.value.length; j++) {
    //     if (e.detail.value[j] == listLocal[i].orderId) {
    //       console.log(listLocal)
    //       console.log(this.data.lists)
    //       listLocal[i].checked = true
    //     }
    //   }
    // }
    for (let i = 0; i < listLocal.length; i++) {
      for (let j = 0; j < listLocal[i].content.length; j++) {
        listLocal[i].content[j].checked = false
        for (let z = 0; z < e.detail.value.length; z++) {
          if (e.detail.value[z] == listLocal[i].content[j].foodId) {
            console.log(listLocal)
            console.log(this.data.lists)
            listLocal[i].content[j].checked = true
          }
        }
      }
    }
    //update
    let noList = [];
    let totalMoney = 0;
    var orderId = 0;
    for (let i = 0; i < listLocal.length; i++) {
      for (let j = 0; j < listLocal[i].content.length; j++) {

        if (listLocal[i].content[j].checked) {
          noList.push(listLocal[i].content[j].foodId)
          totalMoney += listLocal[i].content[j].expectedPrice
          orderId = listLocal[i].orderId
        }
      }
    }
    console.log("0000000000000000000000")
    console.log(noList)
    console.log(noList.toString)
    this.setData({
      lists: listLocal,
      foodNoList: noList,
      totalMoney: totalMoney,
      orderId: orderId
    })
    console.log(this.data.lists)
  },
  formInputChange: function (e) {
    console.log(e)
    this.setData({
      money: e.detail.value
    })
  },
  deal: function (e) {
    wx.navigateTo({
      url: '../DealProfit/DealProfit?finalValueId=' + 0,
    })
  }
})