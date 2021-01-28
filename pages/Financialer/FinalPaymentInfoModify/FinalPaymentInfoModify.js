// pages/Financialer/FinalPaymentInfoChose/FinalPaymentInfoChose.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    foodNoList: []
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
    var that = this
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
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
          console.log(res.data)
          that.setData({
            lists: res.data.data
          })
        } else { }
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
  confirm: function (e) {
    console.log(e)
    console.log("已经选择商品Id为：" + e.currentTarget.id)

    app.globalData.selectFinalCala = this.data.lists[e.currentTarget.id]
    //update
    // var listLocal = this.data.lists
    // let noList = [];
    // var workNo = 0;
    // for (let i = 0; i < listLocal.length; i++) {
    //   for (let j = 0; j < listLocal[i].content.length; j++) {
    //     if ((listLocal[i].orderId == e.currentTarget.id) && (listLocal[i].content[j].checked)) {
    //       noList.push(listLocal[i].content[j])
    //       workNo = listLocal[i].workNo
    //     }
    //   }

    // }
    // console.log("0000000000000000000000")
    // console.log(noList)
    // this.setData({
    //   foodNoList: noList
    // })
    // console.log(this.data.lists)
    // app.globalData.selectList = this.data.foodNoList
    if (true) {
      wx.navigateTo({
        // url: '../FinalPaymentInfoModifyDetail/FinalPaymentInfoModifyDetail?orderId=' + e.currentTarget.id,
        url: '../FinalPaymentInfoDisplay/FinalPaymentInfoDisplay?id=' + app.globalData.selectFinalCala.id,

        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
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

  },
  fff: function (e) {
    console.log(e)
  }
})