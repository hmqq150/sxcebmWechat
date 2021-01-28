// pages/Financialer/BzZyAdd/BzZyAdd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currIndex: 0,
    slideButtons: [],
    showw: false,
    money: "",
    // 保值0  账余1
    index: 0,
    title:"",
    totalMoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = app.globalData.companyList
    this.setData({
      list: list,
      slideButtons: [

        {
          type: 'default',
          text: '保值',
          extClass: 'test',
        }, {
          type: 'default',
          text: '帐余',
          extClass: 'test',
        }
      ],
    });
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
  sss: function (e) {
    console.log(e)
  },
  slideButtonTap(e) {
    console.log('slide button tap', e.detail)


    this.setData({
      showw: true,
      index: e.detail.index
    })
    //http
    var that = this
    var currIndex = this.data.currIndex
    var list = this.data.list
    console.log(this.data.list)

    console.log(list)
    console.log(currIndex)

    console.log(list[currIndex])
    // var s = list[currIndex].com
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getCompanyValue',
      data: {
        id: app.globalData.userInfo.userId,
        companyId: list[currIndex].id
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
          if (that.data.index == 0) {
            //用户点击 保值
            that.setData({
              totalMoney: res.data.baozhi,
              title: "保值"
            })
          } else {
            that.setData({
              totalMoney: res.data.zhangyu,
              title: "帐余"
            })
          }

        } else {
        }
      }
    })
  },
  slideviewTap: function (e) {
    //判断用户点击List中哪一项  返回id 
    console.log('slideviewTap', e)
    console.log('================', this.data.list)
    this.setData({
      currIndex: e.currentTarget.id
    })
  },
  ee: function (e) {

  },
  formInputChange: function (e) {
    console.log(e)
    this.setData({
      money: e.detail.value
    })
  },
  btncancel: function () {
    wx.navigateBack({
      delta: 1,
      success: (res) => { },
      fail: (res) => { },
      complete: (res) => { },
    })
  },
  btnconfirm: function () {
    var list = this.data.list
    var currIndex = this.data.currIndex
    var money = this.data.money
    var index = 0
    if (this.data.index == 0) {
      index = 0
    } else {
      index = 1
    }
    var that = this
    //http submit
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/submitValue',
      data: {
        id: app.globalData.userInfo.userId,
        companyId: list[currIndex].id,
        value: money,
        index: index
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
            success: (res) => { },
            fail: (res) => { },
            complete: (res) => { },
          })
        } else {
        }
      }
    })
  }
})