// pages/createOrder.js
var util = require('../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    formData: {},
    caizhiList: ["Q235A", "Q235B", "T510L", "T700L", "45#", "35#", "ASTM A572 GR65", "T700QZ", "QSTE340TM", "Q550D", "TQ460MCD", "T610L", "T520JJ", "HQ235A", "TQ700MCD(退火)"],
    guigeList: ["1.5*1250", "2.35*1250", "2.45*1250", "2.5*1250", "2.62*1250", "2.65*1250", "2.7*1250","2.75*1250", "3.0*1250", "3.35*1250", "3.65*1250", "4.35*1250", "4.65*1250", "5.35*1250", "5.65*1250", "1.5*1500", "1.8*1500", "2.0*1500", "2.35*1500", "2.5*1500", "2.7*1500", "2.75*1500", "3.0*1500", "4*1500", "4.75*1500", "5.0*1500", "5.75*1500", "6.0*1500", "7.3*1500", "7.35*1500", "8*1500", "8.9*1500", "9.0*1500", "9.3*1500", "9.35*1500", "9.7*1500", "10*1500", "11.35*1500", "2.35*1795"],

    pList: ["热轧卷板", "热轧(中厚)板"],
    biteList: ["15", "20", "100"],
    pListName: "",
    caizhi: "",
    guige: "",
    weight: "",
    steelFac: "",
    company: "",
    strogePlace: "",
    weight: "",
    caigouPrice: "",
    workNo: "",
    bite: "",
    date: "",

    strogeeList: [],
    steelFacList: [],
    companyList: [],

    steelFacID: 0,
    companyID: 0,
    strogePlaceID: 0,
    orderId: 0,

    typeList: [{
      "name": 1
    }],
    active4: [],
    rules: [{
      name: 'yewu',
      rules: {
        required: true,
        message: '业务单号是必选项'
      },
    }, {
      name: 'pList',
      rules: {
        required: true,
        message: '产品品名是必选项'
      },
    }, {
      name: 'caizhi',
      rules: {
        required: true,
        message: '产品材质必选'
      },
    }, {
      name: 'guige',
      rules: {
        required: true,
        message: '产品规格必选'
      },
    }, {
      name: 'weight',
      rules: {
        required: true,
        message: '订单吨数必填'
      },
    }, {
      name: 'caigouPrice',
      rules: {
        required: true,
        message: '订单采购价必填'
      },
    }, {
      name: 'bite',
      rules: {
        required: true,
        message: '保证金比例必选'
      },
    }, {
      name: 'upstream',
      rules: {
        required: true,
        message: '上游厂家必选'
      },
    }, {
      name: 'company',
      rules: {
        required: true,
        message: '客户必选'
      },
    }, {
      name: 'stroge',
      rules: {
        required: true,
        message: '仓储地点必选'
      },
    }, {
      name: 'date',
      rules: {
        required: true,
        message: '订单日期必选'
      },
    }],
    currentChose: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var time = util.formatDate(new Date());
    this.setData({
      date: time
    })
    console.log(this.data.date);
    var strList = app.globalData.strogeeInfo;
    var steedlList = app.globalData.steelFacList;
    var comList = app.globalData.companyList;

    var strListLocal = [];
    var steelListLocal = [];
    var comListLocal = [];
    for (let i = 0; i < strList.length; i++) {
      strListLocal.push(strList[i].strogeName)
    }
    for (let i = 0; i < steedlList.length; i++) {
      steelListLocal.push(steedlList[i].steelName)
    }
    for (let i = 0; i < comList.length; i++) {
      comListLocal.push(comList[i].companyName)
    }
    var typeList = this.typeList
    typeList = [{
      "caizhi": "",
      "guige": "",
      "weight": "",
      "caigouPrice": "",
      "id": 0
    }];
    this.setData({
      strogeeList: strListLocal,
      steelFacList: steelListLocal,
      companyList: comListLocal,
      typeList: typeList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("before Send Rq")
    // var that = this
    // console.log(this.data)
    // //发起网络请求
    // wx.request({
    //   url: app.globalData.ipAddress + app.globalData.proName + '/getOrderNeedModify',
    //   data: {
    //     userId: app.globalData.userInfo.userId
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: "POST",
    //   success(res) {

    //     console.log("after Send Rq")
    //     console.log("-=-=-=-=-=-=")
    //     var code = res.data.error_code
    //     if (code == 0) {
    //       console.log("successful")

    //     } else if (code == 1) {
    //       var data = res.data.data
    //       console.log(res)
    //       wx.showModal({
    //         title: '提示',
    //         content: '当前有待修改信息的订单，是否处理',
    //         success: function(res) {
    //           if (res.confirm) {
    //             console.log("confirm")
    //             var strList = app.globalData.strogeeInfo;
    //             var steedlList = app.globalData.steelFacList;
    //             var comList = app.globalData.companyList;

    //             var strogePlace = "";
    //             var steelFac = "";
    //             var company = "";

    //             for (let i = 0; i < strList.length; i++) {
    //               if (strList[i].id == data.strogeId) {
    //                 strogePlace = strList[i].strogeName
    //               }
    //             }
    //             for (let i = 0; i < steedlList.length; i++) {
    //               if (steedlList[i].id == data.steelFacId) {
    //                 steelFac = steedlList[i].steelName
    //               }
    //             }
    //             for (let i = 0; i < comList.length; i++) {
    //               if (comList[i].id == data.companyId) {
    //                 company = comList[i].companyName
    //               }
    //             }
    //             that.setData({
    //               strogePlace: strogePlace,
    //               steelFac: steelFac,
    //               company: company
    //             })

    //             that.setData({
    //               workNo: data.workNo,
    //               pListName: data.productName,
    //               caizhi: data.caizhi,
    //               guige: data.guige,
    //               weight: data.weight,
    //               caigouPrice: data.price,
    //               bite: data.bite,
    //               date: that.data.date,
    //               steelFacID: data.steelFacId,
    //               companyID: data.companyId,
    //               strogePlaceID: data.strogeId,
    //               orderId: data.orderId
    //             })
    //           } else if (res.cancel) {
    //             console.log("quxiao")
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
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
  bindCaizhiChange: function(e) {
    console.log('材质picker发送选择改变，携带值为', e.detail.value)
    var list = this.data.caizhiList
    var typeList = this.data.typeList
    var index = this.data.currentChose
    console.log("当前选择的是第" + index)
    typeList[index].caizhi = list[e.detail.value]
    var myBoolean = new Boolean();
    myBoolean = false;
    for (let item of typeList) {
      if (item.caizhi == "") {
        myBoolean = false
      } else {
        myBoolean = true
      }
    }
    if (myBoolean) {
      this.setData({
        typeList: typeList,
        [`formData.caizhi`]: e.detail.value
      })
    } else {
      this.setData({
        typeList: typeList,
      })
    }
  },
  bindProductNameChange: function(e) {
    console.log('品名picker发送选择改变，携带值为', e.detail.value)
    var list = this.data.pList
    this.setData({
      pListName: list[e.detail.value],
      [`formData.pList`]: e.detail.value
    })
  },
  bindGuigeChange: function(e) {
    console.log('规格picker发送选择改变，携带值为', e.detail.value)
    var list = this.data.guigeList
    var typeList = this.data.typeList
    var index = this.data.currentChose

    typeList[index].guige = list[e.detail.value]
    var myBoolean = new Boolean();
    myBoolean = false;
    for (let item of typeList) {
      if (item.guige == "") {
        myBoolean = false
      } else {
        myBoolean = true
      }
    }
    if (myBoolean) {
      this.setData({
        typeList: typeList,
        [`formData.guige`]: e.detail.value
      })
    } else {
      this.setData({
        typeList: typeList,
      })
    }
  },
  formWeightChange: function(e) {
    console.log('吨数picker发送选择改变，携带值为', e.detail.value)
    var typeList = this.data.typeList
    var index = this.data.currentChose

    typeList[index].weight = e.detail.value
    var myBoolean = new Boolean();
    myBoolean = false;
    for (let item of typeList) {
      if (item.weight == "") {
        myBoolean = false
      } else {
        myBoolean = true
      }
    }
    if (myBoolean) {
      this.setData({
        typeList: typeList,
        [`formData.weight`]: e.detail.value
      })
    } else {
      this.setData({
        typeList: typeList,
      })
    }

  },
  bindUpStreamChange: function(e) {
    console.log('上游picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data)
    console.log(app.globalData)

    var localFac = this.data.steelFacList
    this.setData({
      steelFac: localFac[e.detail.value],
      [`formData.upstream`]: localFac[e.detail.value]

    })
    var steedlList = app.globalData.steelFacList;
    for (let i = 0; i < steedlList.length; i++) {
      if (steedlList[i].steelName == localFac[e.detail.value]) {
        this.setData({
          steelFacID: steedlList[i].id
        })
      }
    }

  },
  bindDownStreamChange: function(e) {
    console.log('下游picker发送选择改变，携带值为', e.detail.value)
    var localCompany = this.data.companyList
    this.setData({
      company: localCompany[e.detail.value],
      [`formData.company`]: e.detail.value

    })
    var comList = app.globalData.companyList;
    for (let i = 0; i < comList.length; i++) {
      if (comList[i].companyName == localCompany[e.detail.value]) {
        this.setData({
          companyID: comList[i].id
        })
      }
    }
  },
  bindStrogeChange: function(e) {
    console.log('仓储picker发送选择改变，携带值为', e.detail.value)
    var localStroge = this.data.strogeeList
    this.setData({
      strogePlace: localStroge[e.detail.value],
      [`formData.stroge`]: e.detail.value

    })
    var strList = app.globalData.strogeeInfo;
    for (let i = 0; i < strList.length; i++) {
      if (strList[i].strogeName == localStroge[e.detail.value]) {
        this.setData({
          strogePlaceID: strList[i].id
        })
      }


    }
  },
  bindDateChange: function(e) {
    console.log('日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value

    })
  },
  bindbiteChange: function(e) {
    console.log('bitepicker发送选择改变，携带值为', e.detail.value)
    var bitelist = this.data.biteList;
    this.setData({
      bite: bitelist[e.detail.value],
      [`formData.bite`]: bitelist[e.detail.value]
    })
  },
  formInputChange: function(e) {
    console.log(e)
    var type = e.currentTarget.dataset.field
    var value = e.detail.value
    if (type == "yewu") {
      this.setData({
        workNo: value,
        [`formData.yewu`]: e.detail.value
      })
    } else if (type == "weight") {
      var typeList = this.data.typeList
      var index = this.data.currentChose
      console.log("-----weight------")
      console.log(typeList)
      console.log(index)
      typeList[index].weight = value
      var myBoolean = new Boolean();
      myBoolean = false;
      for (let item of typeList) {
        if (item.weight == "") {
          myBoolean = false
        } else {
          myBoolean = true
        }
      }
      if (myBoolean) {
        this.setData({
          typeList: typeList,
          [`formData.weight`]: e.detail.value
        })
      } else {
        this.setData({
          typeList: typeList,

        })
      }

    } else if (type == "price") {
      var typeList = this.data.typeList
      var index = this.data.currentChose

      typeList[index].caigouPrice = value
      var myBoolean = new Boolean();
      myBoolean = false;
      for (let item of typeList) {
        if (item.caigouPrice == "") {
          myBoolean = false
        } else {
          myBoolean = true
        }
      }
      if (myBoolean) {
        this.setData({
          typeList: typeList,
          [`formData.caigouPrice`]: e.detail.value
        })
      } else {
        this.setData({
          typeList: typeList,

        })
      }
    }
  },

  submitForm() {
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
        wx.showToast({
          title: '校验通过'
        })
        console.log("before Send Rq")
        var that = this
        console.log(this.data)
        //发起网络请求
        wx.request({
          url: app.globalData.ipAddress + app.globalData.proName + '/createOrder',
          data: {
            userId: app.globalData.userInfo.userId,
            workNo: that.data.workNo,
            pListName: that.data.pListName,
            // caizhi: that.data.caizhi,
            // guige: that.data.guige,
            // weight: that.data.weight,
            // caigouPrice: that.data.caigouPrice,
            typeList: that.data.typeList,
            bite: that.data.bite,
            date: that.data.date,
            steelFacID: that.data.steelFacID,
            companyID: that.data.companyID,
            strogePlaceID: that.data.strogePlaceID,
            orderId: that.data.orderId
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success(res) {
            console.log("after Send Rq")
            console.log("-=-=-=-=-=-=")
            var code = res.data.error_code
            if (code == 0) {
              console.log("successful")
              wx.showModal({
                title: '提示',
                content: '提交成功',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateBack({
                      delta: 1,
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              })

            } else if (code == 1) {
              if (res.data.data == "重复订单号 无法提交") {
                wx.showModal({
                  title: '提示',
                  content: '订单号重复 无法提交',
                })
              }
            }
          }
        })
      }
    })
  },
  onChange(event) {
    console.log(event)
    console.log("onchange");

    this.setData({
      activeNames: event.detail
    });
  },
  longtap: function(e) {
    console.log("----------longtap----------")
    console.log(e)
    var typeList = this.data.typeList
    if (typeList.length > 1) {
      typeList.splice(e.target.id, 1)
      this.setData({
        typeList: typeList
      })
    }
    var ll = typeList.length
    var item = typeList[ll - 1]
    this.setData({
      [`formData.caizhi`]: item.caizhi,
      [`formData.guige`]: item.guige,
      [`formData.weight`]: item.weight,
      [`formData.caigouPrice`]: item.caigouPrice
    })
  },
  bdtap: function(e) {
    var typeList = this.data.typeList;
    console.log(typeList)
    var id = typeList[typeList.length - 1].id;
    console.log(typeList[typeList.length - 1].id);
    var item = {
      "caizhi": "",
      "guige": "",
      "weight": "",
      "caigouPrice": "",
      "id": ++id
    }
    typeList.push(item);
    this.setData({
      typeList: typeList,
      [`formData.caizhi`]: "",
      [`formData.guige`]: "",
      [`formData.weight`]: "",
      [`formData.caigouPrice`]: ""
    })
    this.setData({
      typeList: typeList,
      [`formData.guige`]: e.detail.value
    })
  },
  shorttap: function(e) {
    console.log("-----------shortTap--------------")
    console.log(e)
    this.setData({
      currentChose: e.currentTarget.id
    })
  },
  cancel:function(e){
    wx.navigateBack({
      delta: 1,
    })
  }
})