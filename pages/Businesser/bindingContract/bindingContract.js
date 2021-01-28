// pages/Businesser/bindingContract/bindingContract.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    orderNoList: [],
    selbtn:[],
    contractNo: "",
    tag: false,
    checkboxItems: [{
        workNo: '19001',
        caizhi: "Q235A",
        guige: "1*6m",
        value: '0',
        checked: false
      },
      {
        workNo: '19002',
        caizhi: "Q235B",
        guige: "1*6m",
        checked: false,
        value: '1',
      }, {
        workNo: '19003',
        caizhi: "Q235C",
        guige: "1*6m",
        checked: false,
        value: '2'
      }
    ],
    steelFacList: [],
    steelFac: "",
    isTaiGang: true,
    hasClick: false,
    hasClickYewu:false,
    hasClickGuige:false,
    isClickUpsteam:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var strList = app.globalData.strogeeInfo;
    var steedlList = app.globalData.steelFacList;
    var comList = app.globalData.companyList;

    var strListLocal = [];
    var steelListLocal = [];
    var comListLocal = [];
    for (let i = 0; i < steedlList.length; i++) {
      steelListLocal.push(steedlList[i].steelName)
    }
    this.setData({

      steelFacList: steelListLocal

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
  formInputChange: function(e) {
    console.log(e)
    var value = e.detail.value
    this.setData({
      contractNo: value
    })
  },
  connectToOrder: function(e) {
    console.log(e)

    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getOrderListForBind',
      data: {
        id: app.globalData.userInfo.userId,
        isTaiGang:that.data.isTaiGang
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
          var listsLocal = res.data.data

          for (let i = 0; i < listsLocal.length; i++) {
            listsLocal[i].checked = false
          }
          that.setData({
            lists: listsLocal,
            tag: true
          })
        } else {}
      }
    })
  },
  checkboxChange: function(e) {
    this.setData({
      hasClickYewu:true
    })
    //update
    let noList = [];
    if (!this.data.isTaiGang) {
      console.log(e)
      console.log(this.data.lists)
      var listLocal = this.data.lists
      console.log(listLocal)
      for (let i = 0; i < listLocal.length; i++) {
        listLocal[i].checked = false
        for (let j = 0; j < e.detail.value.length; j++) {
          if (e.detail.value[j] == listLocal[i].orderId) {
            console.log(listLocal)
            console.log(this.data.lists)
            listLocal[i].checked = true
          }
        }
      }
      for (let i = 0; i < listLocal.length; i++) {
        if (listLocal[i].checked) {
          noList.push(listLocal[i].orderId)
        }
      }
      console.log(noList)
      this.setData({
        lists: listLocal
      })
    } else {
      //isTaiGang
      console.log('radio发生change事件，携带value值为：', e.detail.value);

      var radioItems = this.data.lists;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].orderId == e.detail.value;
      }
      for (let i = 0; i < radioItems.length; i++) {
        if (radioItems[i].checked) {
          noList.push(radioItems[i].orderId)
        }
      }
      console.log(noList)
      this.setData({
        lists: radioItems
      });
    }


    this.setData({
      orderNoList: noList
    })
    console.log(this.data.lists)
  },
  caizhiChange: function(e) {
    console.log(e)
    var value = e.detail.value
    var selbtn = []
    selbtn.push(Number(value))
    this.setData({
      selbtn: selbtn,
      hasClickGuige:true
    })
  },
  submitForm: function(e) {
    console.log(e)
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/bindToOrder',
      data: {
        id: app.globalData.userInfo.userId,
        contractNo: that.data.contractNo,
        count: that.data.orderNoList.length,
        orderNoList: (that.data.isTaiGang) ? that.data.selbtn : that.data.orderNoList,
        isTaiGang: that.data.isTaiGang
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
        } else {}
      }
    })


  },
  bindUpStreamChange: function(e) {
    console.log('上游picker发送选择改变，携带值为', e.detail.value)
    var localFac = this.data.steelFacList
    this.setData({
      steelFac: localFac[e.detail.value],
      isClickUpsteam:true,
      tag: false,
      hasClick:false
    })

    if (localFac[e.detail.value] =="山西太钢不锈钢股份有限公司" ){
      this.setData({
        isTaiGang: true
      })
    } else if (localFac[e.detail.value] == "承德承钢商贸有限公司" ){
      this.setData({
        isTaiGang: false
      })
    }
    var locallists = this.data.lists
    for (let i = 0; i < locallists.length; i++) {
      if (locallists[i].checked) {
        locallists[i].checked = false
      }
    }
    this.setData({
      lists: locallists
    })
  },
  getDetail: function(e) {
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getDetail',
      data: {
        id: app.globalData.userInfo.userId,
        orderId: that.data.orderNoList
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
            hasClick: true,
            caizhilists: res.data.data
          })

        } else {}
      }
    })


  },
  cancel:function(e){
    wx.navigateBack({
      delta: 1,
    })
  }
})