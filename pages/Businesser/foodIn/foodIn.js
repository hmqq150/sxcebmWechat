// pages/Businesser/foodIn/foodIn.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pName: "",
    foodNo: "",
    caizhi: "",
    guige: "",
    piece: 0,
    weight: "",
    gangNo: "",
    strogePlace: "",
    steelFac: "",
    multiArray: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',],
      ['1', '2', '3', '4', '5', '6', '7', '8'],
      ['1', '2']
    ],
    multiIndex: [0, 0, 0],
    itemId:0,
    isAgree: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("---------foodIn  onLoad------------")
    var strList = app.globalData.strogeeInfo;
    var steedlList = app.globalData.steelFacList;

    var strListLocal = [];
    var steelListLocal = [];
    for (let i = 0; i < strList.length; i++) {
      strListLocal.push(strList[i].strogeName)
    }
    for (let i = 0; i < steedlList.length; i++) {
      steelListLocal.push(steedlList[i].steelName)
    }

    this.setData({
      strogeeList: strListLocal,
      steelFacList: steelListLocal
    })


    var that = this
    // wx.scanCode({
    //   success(res) {
    //     console.log(res)
    //     console.log("---------scan code------------")
    //     console.log(res.result)
    //     // console.log("---------sellerview")
    //     // console.log(res.result)
    //     // console.log("---------sellerview")
    //     // wx.navigateTo({
    //     //   url: '../sellerconfirm/sellerconfirm'
    //     // })


    //     // var urlsend = res.result.split('=')
    //     // var sendd = urlsend[0] + "=1";
    //     // console.log(sendd)
    //     // var sss = sendd.split('?')
    //     // var url = sss[0]
    //     // var urll = url.split('/')
    //     // var wantValue = urll[urll.length - 1]

    //     console.log(wantValue)
    //   }

    // })

    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res)
        // wx.showModal({
        //   title: "tishi",
        //   content: res.result,

        // })
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
        that.setData({
          strogePlace: strogePlace,
          steelFac: steelFac,
          pName: pName,
          foodNo: foodNo,
          caizhi: caizhi,
          guige: guige,
          piece: piece,
          weight: weight,
          gangNo: gangNo,
          itemId:itemId,
          [`formData.strogePlace`]: strogePlace,
          [`formData.steelFac`]: steelFac,
          [`formData.pName`]: pName,
          [`formData.foodNo`]: foodNo,
          [`formData.caizhi`]: caizhi,
          [`formData.guige`]: guige,
          [`formData.piece`]: piece,
          [`formData.weight`]: weight,
          [`formData.gangNo`]: gangNo,
          [`formData.itemId`]: itemId,

        })
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
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log(data.multiIndex);
    //this.setData(data);
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  submitForm: function (e) {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        //发送之前
        console.log("brfore sendRq")
        console.log(this.data)
        var that = this
        var strList = app.globalData.strogeeInfo;
        var steedlList = app.globalData.steelFacList;
        var storgeId = 0;
        var upstreamId = 0;
        //search name
        for (let i = 0; i < strList.length; i++) {
          if (strList[i].strogeName == this.data.strogePlace) {
            storgeId = strList[i].id
          }
        }
        for (let i = 0; i < steedlList.length; i++) {
          if (steedlList[i].steelName == this.data.steelFac) {
            upstreamId = steedlList[i].id
          }
        }
        console.log(storgeId)
        var index = 0;
        if( that.data.isTaiGang ){
           index = 0
        }else {
           index = 1
        }
        console.log("调用入库接口")
        //发起网络请求
        wx.request({
          url: app.globalData.ipAddress + app.globalData.proName + '/pushFoodIn',
          data: {
            foodNo: that.data.foodNo,
            gangNo: that.data.gangNo,
            upStreamId: upstreamId,
            storgeId: storgeId,
            itemId: that.data.itemId,
            isFullIn: that.data.isAgree,
            weight: that.data.weight,
            location:that.data.multiIndex
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
              wx: wx.showModal({
                title: '提示',
                content: '已成功入库',
                success: function (res) {
                  wx.navigateBack({
                    delta: 1,
                  })
                },
                fail: function (res) { },
                complete: function (res) { },
              })

            } else { }
          }
        })
      }
    })
  },
  cancel:function(e){
    wx.navigateBack({
      delta: 1,
    })
  }
})