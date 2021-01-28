// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userInputPwd: "",
    checked: false
  },
  onChange(e) {
    this.setData({
      checked: e.detail,
    })
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



    if (this.data.checked) {
      var that = this
      wx.requestSubscribeMessage({
        tmplIds: ['DN-HEYrUStZHfvPirsMcwbVhwt-20pSYvu_y5Z4t610'],
        success(res) {
          console.log("-----yes-----")
        }
      })
      //发送之前
      console.log("brfore sendRq")
      console.log(this.data)
      console.log(app.globalData.ipAddress + app.globalData.proName + '/login')
      //test
      //API.login();
      var that = this
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.globalData.ipAddress + app.globalData.proName + '/login',
              data: {
                userName: that.data.userName,
                //phonenumber: e.detail.value.username,
                password: that.data.userInputPwd,
                code: res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: "POST",
              success(res) {
                console.log("-=-=-=-=-=-=")
                var code = res.data.error_code
                if (code == 0) {
                  //leyi denglu
                  app.globalData.userInfo = res.data.data.userInfo
                  console.log(res.data)
                  console.log("============================login==============================")
                  console.log(app.globalData.userInfo)
                  console.log("============================login==============================")
                  var userInfo = app.globalData.userInfo
                  var value = 0;
                  switch (value) {
                    case 0:
                      //发送之前
                      console.log("brfore sendRq")
                      console.log(that.data)
                      //发起网络请求
                      wx.request({
                        url: app.globalData.ipAddress + app.globalData.proName + '/getBaseInfo',
                        data: {
                        },
                        header: {
                          'content-type': 'application/json' // 默认值
                        },
                        method: "GET",
                        success(res) {
                          console.log("-=-=-=-=-=-=")
                          console.log("after sendRq")
                          var code = res.data.error_code
                          if (code == 0) {
                            console.log("successful")

                            app.globalData.strogeeInfo = res.data.data.strogeList
                            app.globalData.steelFacList = res.data.data.steelFacList
                            app.globalData.companyList = res.data.data.companyList
                            console.log(app.globalData)
                            app.globalData.userInfo.base = e.detail.userInfo
                            console.log("=============")
                            console.log(app.globalData)

                          } else {

                          }
                        }
                      })
                      wx.switchTab({
                        url: '../index/index',
                      })


                      break;
                    case 1:
                      break;
                    case 2:
                      break;
                  }
                } else if (code == 1) {
                  if (res.data.data == "密码错误") {
                    wx.showModal({
                      title: '提示',
                      content: '密码错误 请重新输入',
                    })
                  }
                }
              }
            })
          }
        }
      })
    }else{
      wx.showModal({
        showCancel: false,
        title:"提示",
        content:"请先勾选认同《法律条款及隐私政策》"
      })
    }

  },
  formInputChange: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.field == "password") {
      this.setData({
        userInputPwd: e.detail
      })
    } else {
      this.setData({
        userName: e.detail
      })
    }
    console.log(this.data.userName)

    console.log(this.data.userInputPwd)
  }
})
