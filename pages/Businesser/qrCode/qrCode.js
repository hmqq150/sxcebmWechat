// pages/Businesser/foodIn/foodIn.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    context: "",
    guigeList: [],
    orderId: 0,
    caizhiList: ["Q235A", "Q235B", "T510L", "T700L", "45#", "35#", "ASTM A572 GR65", "T700QZ", "QSTE340TM", "Q550D", "TQ460MCD", "T610L", "T520JJ", "HQ235A", "TQ700MCD(退火)"],
    pList: ["热轧卷板", "热轧(中厚)板"],
    steelFac: "",
    strogePlace: "",
    caizhi: "",
    guige: "",
    weight: "",
    insideNo: "",
    gangNo:"",
    checkboxItems: [],
    selectOrderTag: false,
    isTaiGang: true,
    localValues: "",
    hasSelectOrder: false,
    foodNo: "",
    strogeeList: [],
    steelFacList: [],
    formData: {},
    ll: [],
    piece:"",
    pName:"",
    rules: [{
      name: 'foodNo',
      rules: {
        required: true,
        message: '钢卷号必填'
      },

    }, {
      name: 'weight',
      rules: {
        required: true,
        message: '吨数必填'
      },

    }, {
      name: 'guige',
      rules: {
        required: true,
        message: '规格必选'
      },

    }, {
      name: 'upsteam',
      rules: {
        required: true,
        message: '上游厂家必选'
      }
    }, {
      name: 'storge',
      rules: {
        required: true,
        message: '仓储地点必选'
      }
    }],
    confirm: false,
    itemId: 0,
    checkboxItemSelectIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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

  bindGuigeChange: function (e) {
    console.log('规格picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      context: this.data.guigeList[e.detail.value].context,
      itemId: ((this.data.checkboxItems[this.data.checkboxItemSelectIndex]).list[e.detail.value]).id,
      [`formData.guige`]: this.data.guigeList[e.detail.value].context

    })
  },
  bindStrogeChange: function (e) {
    console.log('仓储picker发送选择改变，携带值为', e.detail.value)
    var localStroge = this.data.strogeeList
    this.setData({
      strogePlace: localStroge[e.detail.value],
      [`formData.storge`]: localStroge[e.detail.value]

    })

  },
  formWeightChange: function (e) {
    console.log('吨数picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      weight: e.detail.value,
      [`formData.weight`]: e.detail.value
    })
  },
  bindUpStreamChange: function (e) {
    console.log('上游picker发送选择改变，携带值为', e.detail.value)
    var localFac = this.data.steelFacList
    this.setData({
      steelFac: localFac[e.detail.value],
      [`formData.upsteam`]: localFac[e.detail.value]

    })
    if (localFac[e.detail.value] == "承德承钢商贸有限公司") {
      this.setData({
        isTaiGang: false
      })
    } else if (localFac[e.detail.value] == "山西太钢不锈钢股份有限公司") {
      this.setData({
        isTaiGang: true
      })
    }

    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var ll = this.data.isTaiGang ? 0 : 1
    console.log(ll)
    var that = this
    //发起网络请求
    // wx.request({
    //   url: app.globalData.ipAddress + app.globalData.proName + '/getInsideNo',
    //   data: {
    //     id: app.globalData.userInfo.userId,
    //     tag: (this.data.isTaiGang) ? 0 : 1
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: "POST",
    //   success(res) {
    //     console.log("-=-=-=-=-=-=")
    //     console.log("after sendRq")
    //     var code = res.data.error_code
    //     if (code == 0) {
    //       console.log("successful")
    //       that.setData({
    //         insideNo: res.data.data
    //       })

    //     } else {}
    //   }
    // })

    //调用接口获取订单信息
    //发送之前
    console.log("brfore sendRq")
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getOrderListForFoodIn',
      data: {
        id: app.globalData.userInfo.userId,
        tag: (that.data.isTaiGang) ? 0 : 1
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

          var list = res.data.data

          for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
          }
          that.setData({
            checkboxItems: list
          })
        } else { }
      }
    })

    // //reset 复选框check值
    // var localcheckboxItems = this.data.checkboxItems;
    // for(let i=0;i<localcheckboxItems.length;i++){
    //   localcheckboxItems[i].checked = false;
    // }
    // this.setData({
    //   checkboxItems:localcheckboxItems
    // })

  },
  // checkboxChange: function (e) {
  //   console.log('checkbox发生change事件，携带value值为：', e.detail.value);

  //   var checkboxItems = this.data.checkboxItems, values = e.detail.value;
  //   for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
  //     console.log(values)
  //     checkboxItems[i].checked = false;

  //     // for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
  //     //   if (checkboxItems[i].orderId == values[j]) {
  //     //     checkboxItems[i].checked = true;
  //     //     break;
  //     //   }
  //     // }
  //     if( values == checkboxItems[i].orderId ){
  //          checkboxItems[i].checked = true;
  //          break;
  //     }
  //   }

  //   this.setData({
  //     checkboxItems: checkboxItems,
  //     // [`formData.checkbox`]: e.detail.value,
  //     localValues:e.detail.value
  //   });
  //   if (e.detail.value.length != 0 ){
  //     this.setData({
  //       hasSelectOrder:true,

  //     })
  //   }

  // },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      confirm: true
    })

    var checkboxItems = this.data.checkboxItems;
    for (var i = 0, len = checkboxItems.length; i < len; ++i) {
      checkboxItems[i].checked = checkboxItems[i].id == e.detail.value;
      if (checkboxItems[i].checked) {
        this.setData({
          hasSelectOrder: true,
          orderId: e.detail.value,
          caizhi: checkboxItems[i].caizhi,
          guige: checkboxItems[i].guige,
          checkboxItemSelectIndex: i,
          pName:checkboxItems[i].productName
        })
        if (!this.data.isTaiGang) {
          this.setData({
            guigeList: checkboxItems[i].list
          })
          var ll = []
          for (let j = 0; j < checkboxItems[i].list.length; j++) {
            ll.push(checkboxItems[i].list[j].context)
          }
          this.setData({
            ll: ll
          })
          if (ll.length == 1) {

            var list = this.data.checkboxItems[this.data.checkboxItemSelectIndex].list
            console.log(list)
            this.setData({
              context: ll[0],
              itemId: list[0].id
            })
          }
        } else {
          //taigang
          this.setData({
            itemId: e.detail.value,
            [`formData.guige`]: "taigang"
          })
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems,
      // [`formData.radio`]: e.detail.value
    });

  },
  selectOrder: function (e) {

    if (this.data.steelFac == "") {
      wx.showModal({
        title: '提示',
        content: '请先选择上游厂家',
      })
    } else {
      this.setData({
        selectOrderTag: !(this.data.selectOrder)
      })
    }
  },
  formInputChange: function (e) {
    console.log(e)
    var type = e.currentTarget.dataset.field
    var value = e.detail.value
    if (type == "foodNo") {
      this.setData({
        foodNo: value,
        [`formData.foodNo`]: value
      })
    } else if (type == "weight") {
      this.setData({
        weight: value,
        [`formData.weight`]: value
      })
    }else if(type == "gangNo"){
      this.setData({
        gangNo:value,
        [`formData.gangNo`]: value

      })
    }else if(type == "piece"){
      this.setData({
        piece:value
      })
    }
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
        var str = that
      .data.strogePlace +";"+ index +";"+ that.data.pName +";"+ that.data.foodNo+";"+that.data.caizhi +";"+ that.data.guige +";"+ that.data.piece +";"+ that.data.weight +";"+ this.data.gangNo+";"+this.data.itemId+";"+this.data.orderId
        console.log(str)
        wx.setClipboardData({
          data: str,
          success (res) {
            wx.getClipboardData({
              success (res) {
                console.log(res.data) // data
                wx.navigateTo({
                  url: '../print/print?str='+str,
                })
              }
            })
            // wx.showModal({
            //   title: '提示',
            //   content: '请打开打印机APP，生成二维码',
            //   success: function (res) {
            //    if (res.confirm) {
            //     console.log('确定')
            //     wx.navigateBack({
            //       delta: 1,
            //       success: (res) => {},
            //       fail: (res) => {},
            //       complete: (res) => {},
            //     })
            //    } else if (res.cancel) {
            //     console.log('取消')
            //    }
            //   }
            //  })

          }
        })


        //初始化蓝牙设备

      }
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  cancel:function(e){
    wx.navigateBack({
      delta: 1,
    })
  }
})