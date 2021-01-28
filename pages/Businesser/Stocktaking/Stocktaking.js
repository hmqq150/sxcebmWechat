// pages/Businesser/Stocktaking/Stocktaking.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    totalWeight: 0,
    totalAmount: 0,
    pkId: 0,
    hasPankuRecord: false,
    currCount: 0,
    currWeight: 0,
    currData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("  onLoad~~~")
    console.log(this.data)
    var that = this
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/panku',
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
          console.log("successful~~~")
          console.log(res.data)

          var list = res.data.data
          var weight = 0;
          for (let i = 0; i < list.length; i++) {
            weight += Number(list[i].weight)
          }
          that.setData({
            list: list,
            totalAmount: list.length,
            totalWeight: weight
          })
          wx.request({
            url: app.globalData.ipAddress + app.globalData.proName + '/getPankuRecordId',
            data: {
              id: app.globalData.userInfo.userId
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success(res) {
              var hasPankuRecord = false
      
              console.log("-=-=-=-=-=-=")
              console.log("after sendRq")
              console.log("getPankuRecordId=-=")
              console.log(res)
              var code = res.data.error_code
              if (code == 1) {
                console.log("successful~~~")
                console.log("已经有~~~")
                hasPankuRecord = true
                var data = []
                data = res.data.data.data
                console.log(data)
      
                var list = that.data.list
                for( let i =0;i<data.length;i++ ){
                  for( let j = 0;j<list.length;j++ ){
                    if( data[i] == list[j].foodId ){
                      list[j].checked = true
                    }
                  }
                }
                that.setData({
                  currData: data,
                  list:list
                })
              } else {
                console.log("successful~~~")
                console.log("新建~~~")
                hasPankuRecord = false
              }
              that.setData({
                pkId: res.data.data.recordId,
                hasPankuRecord: hasPankuRecord,
                currCount: res.data.data.size,
                currWeight: res.data.data.weight,
              })
            }
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
    console.log("  onShow~~~")
    console.log(this.data)
    var that = this
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getPankuRecordId',
      data: {
        id: app.globalData.userInfo.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        var hasPankuRecord = false

        console.log("-=-=-=-=-=-=")
        console.log("after sendRq")
        console.log("getPankuRecordId=-=")
        console.log(res)
        var code = res.data.error_code
        if (code == 1) {
          console.log("successful~~~")
          console.log("已经有~~~")
          hasPankuRecord = true
          var data = []
          data = res.data.data.data
          console.log(data)

          var list = that.data.list
          for( let i =0;i<data.length;i++ ){
            for( let j = 0;j<list.length;j++ ){
              if( data[i] == list[j].foodId ){
                list[j].checked = true
              }
            }
          }
          that.setData({
            currData: data,
            list:list
          })
        } else {
          console.log("successful~~~")
          console.log("新建~~~")
          hasPankuRecord = false
        }
        that.setData({
          pkId: res.data.data.recordId,
          hasPankuRecord: hasPankuRecord,
          currCount: res.data.data.size,
          currWeight: res.data.data.weight,
        })
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
  pankuscan: function (e) {
    var that = this

    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.showModal({
          title: "内容",
          content: res.result,

        })
        var str = res.result
        var urlsend = res.result.split(';')
        var strogePlace = urlsend[0]
        var steelFac = ""
        if (urlsend[1] == 0) {
          steelFac = "山西太钢不锈钢股份有限公司"
        } else {
          steelFac = "承德承钢商贸有限公司"
        }
        var pName = urlsend[2]
        var foodNo = urlsend[3]
        var caizhi = urlsend[4]
        var guige = urlsend[5]
        var piece = urlsend[6]
        var weight = urlsend[7]
        var gangNo = urlsend[8]
        var itemId = urlsend[9]
        // that.setData({
        //   strogePlace: strogePlace,
        //   steelFac: steelFac,
        //   pName: pName,
        //   foodNo: foodNo,
        //   caizhi: caizhi,
        //   guige: guige,
        //   piece: piece,
        //   weight: weight,
        //   gangNo: gangNo,
        //   itemId:itemId,
        //   [`formData.strogePlace`]: strogePlace,
        //   [`formData.steelFac`]: steelFac,
        //   [`formData.pName`]: pName,
        //   [`formData.foodNo`]: foodNo,
        //   [`formData.caizhi`]: caizhi,
        //   [`formData.guige`]: guige,
        //   [`formData.piece`]: piece,
        //   [`formData.weight`]: weight,
        //   [`formData.gangNo`]: gangNo,
        //   [`formData.itemId`]: itemId,

        // })
        if (that.data.pkId == 0) {
          var isNew = true
        } else {
          var isNew = false
        }
        wx.request({
          url: app.globalData.ipAddress + app.globalData.proName + '/submitPanku',
          data: {
            id: app.globalData.userInfo.userId,
            recordId: that.data.pkId,
            gangNo: gangNo,
            foodNo: foodNo,
            isNew: isNew
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success(res) {
            console.log("-=-=-=-=-=-=")
            console.log("after sendRq")
            var code = res.data.error_code
            if (code == 1) {
              wx.showModal({
                title: "提示",
                content: '该货物本次盘库已被盘过',
              })
            }
            var hasPankuRecord = true
            that.setData({
              hasPankuRecord: hasPankuRecord
            })
            that.onShow()
          }
        })
      }
    })
  },
  stopScan: function (e) {
    var that = this
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/stopPanku',
      data: {
        id: app.globalData.userInfo.userId,
        recordId: that.data.pkId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log("-=-=-=-=-=-=")
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  }
})