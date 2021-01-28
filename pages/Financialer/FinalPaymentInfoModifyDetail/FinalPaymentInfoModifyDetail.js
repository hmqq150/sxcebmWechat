// pages/Financialer/FinalPaymentInfoDetail/FinalPaymentInfoDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchTag: false,
    id: 0,
    noList: "",
    isTimeConfirmed: false,
    hasDealPrice: false,
    createTime: "",
    startTime: "",
    endTime: "",
    dealPrice: "",
    switchTypeTag: false,
    str: "",
    littleTitle: "",
    isJingcang: true,
    waitForNoteList:[],
    orderId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var orderId = app.globalData.selectFinalCala.orderId
    var that = this
    console.log(options)
    this.setData({
      orderId:orderId
    })
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
      url: app.globalData.ipAddress + app.globalData.proName + '/getOrderDetail',
      data: {
        orderId: this.data.orderId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log("after sendRq")
        console.log(res)

        var code = res.data.error_code
        if (code == 0) {
          console.log("successful")
          that.setData({
            isTimeConfirmed: res.data.data.isTimeConfirmed,
            createTime: res.data.data.createTime,
            startTime: res.data.data.startTime,
            hasDealPrice: res.data.data.hasDealPrice,
            dealPrice: res.data.data.dealPrice,
            isJingcang: res.data.data.isJingcang
          })
          if (!that.data.hasDealPrice) {
            that.setData({
              dealPrice: ""
            })
          }
          if (that.data.isJingcang) {
            that.setData({
              str: "当前商品订单为 金仓",
              littleTitle: "使用保证金"
            })
          } else {
            that.setData({
              str: "当前商品订单为 代采",
              littleTitle: "是否为最终批次"
            })
          }
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
  bindcreateDateChange: function(e) {
    console.log('日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      createTime: e.detail.value
    })
  },
  bindStartTimeChange: function(e) {
    console.log('日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    console.log('日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  formInputChange: function(e) {
    console.log(e)
    var type = e.currentTarget.dataset.field
    var value = e.detail.value
    if (type == "yewu") {
      this.setData({
        workNo: value
      })
    } else if (type == "dealPrice") {
      this.setData({
        dealPrice: value
      })
    } else if (type == "price") {
      this.setData({
        caigouPrice: value
      })
    } else if (type == "bite") {
      this.setData({
        bite: value
      })
    }
  },
  switchDeal: function(e) {
    console.log(e)
    this.setData({
      switchTag: !(this.data.switchTag)
    })
    console.log(this.data.switchTag)
  },
  switchType: function(e) {
    console.log(e)
    this.setData({
      switchTypeTag: !(this.data.switchTypeTag)
    })
    console.log(this.data.switchTypeTag)
  },
  submitForm: function(e) {
    if (this.data.startTime == "") {
      wx.showModal({
        title: '提示',
        content: '结息日请选择',
      })
    } else if (this.data.endTime == "") {
      wx.showModal({
        title: '提示',
        content: '结息日请选择',
      })
    }else {
      var that = this
      //发送之前
      console.log("brfore sendRq")
      console.log(this.data)
      wx.showModal({

        title: '提示',

        content: "确认提交吗",

        success: function(res) {
          if (res.confirm) { //这里是点击了确定以后
            console.log('用户点击确定')
            if ((that.data.createTime!="") && (that.data.startTime!="")){
              that.setData({
                isTimeConfirmed:true
              })
            }
            if (that.data.dealPrice != ""){
              that.setData({
                hasDealPrice: true
              })
            }
            var dateData = {}
            dateData.isTimeConfirmed = that.data.isTimeConfirmed
            dateData.createTime = that.data.createTime
            dateData.startTime = that.data.startTime
            dateData.endTime = that.data.endTime
            app.globalData.dateData = dateData
            wx.navigateBack({
              delta: 1,
            })

          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }

        }

      })



    }
  }
})