//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerList: ["../../image/new/1.png", "../../image/new/2.png", "../../image/new/3.png"],//轮播图
    current: 0,//当前轮播图下标
    isWsStarted: false,
    motto: 'Hello World',
    userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    identity: 0,
    list: [],
    title: "",
    countLists: [],
    //存储计时器
    setInter: '',
    num: 1,
  },
  // 轮播图change
  swiperCHange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //this.loadWebsoc()
    console.log(app.globalData.userInfo)

    wx.getSystemInfo({
      success (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        app.globalData.systemInfo = res
      }
    })
    var identity = app.globalData.userInfo.identify
    switch (identity) {
      case 0:
        //业务人员
        var title = "业务管理"
        var localList = [{
          id: 0,
          str: 'OrderCreate',
          name: '新建订单'
        }, {
          id: 1,
          str: 'ContractBinding',
          name: '合同绑定'
        }, {
          id: 13,
          str: 'QRCoded',
          name: '生成二维码'
        }, {
          id: 2,
          str: 'FoodIn',
          name: '货物入库'
        }, {
          id: 3,
          str: 'KaiPingConfirm',
          name: '开平确认'
        }
          , {
          id: 14,
          str: 'Stocktaking',
          name: '盘点库存'
        }
          // , {
          //   id: 4,
          //   str: 'ManageOrder',
          //   name: '订单管理'
          // }
        ];
        this.setData({
          list: localList,
          title: title
        });

        break;
      case 1:
        //客户人员
        var title = "客户管理"

        var localList = [{
          id: 5,
          str: 'marginPayment',
          name: '保证金支付'
        }, {
          id: 6,
          str: 'DeliveryApplication',
          name: '提货申请'
        },
        //  {
        //   id: 7,
        //   str: 'BalancePayment',
        //   name: '货款支付'
        // },
        {
          id: 12,
          str: 'KaiPingApply',
          name: '待出库商品'
        }];
        this.setData({
          list: localList,
          title: title
        });
        break;
      case 2:
        //财务人员
        var title = "财务管理"

        var localList = [{
          id: 8,
          str: 'marginConfirm',
          name: '保证金确认'
        }, {
          id: 9,
          str: 'paymentComfirm',
          name: '付款确认'
        }, {
          id: 10,
          str: 'chargeConfirm',
          name: '结算确认'
        }
          // , {
          //   id: 11,
          //   str: 'BalanceConfirm',
          //   name: '支付货款确认'
          // }
        ];
        this.setData({
          list: localList,
          title: title
        });
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
    }
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getMsgCount',
      data: {
        userId: app.globalData.userInfo.userId
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
          var countList = res.data.data
          that.setData({
            countLists: countList
          })
          console.log(countList)
        } else { }
      }
    })


  },
  getUserInfo: function (e) {
    console.log(e)

  },
  kindToggle: function (e) {
    console.log(e)
    console.log(e.currentTarget.id)
    switch (e.currentTarget.id) {
      case '0':
        console.log('点击新建订单')
        wx.navigateTo({
          url: '../Businesser/createOrder/createOrder'
        })
        break;
      case '1':
        console.log('点击绑定合同')
        wx.navigateTo({
          url: '../Businesser/bindingContract/bindingContract'
        })
        break;
      case '2':
        console.log('货物入库')
        wx.navigateTo({
          url: '../Businesser/foodIn/foodIn'
        })
        break;
      case '3':
        console.log('开平确认')
        wx.navigateTo({
          url: '../Businesser/KaipingConfirm/KaipingConfirm'
        })
        break;
      case '4':
        // console.log('管理订单')
        // wx.navigateTo({
        //   url: '../Businesser/OrderManagement/OrderManagement'
        // })
        break;
      case '5':
        //保证金支付
        wx.navigateTo({
          url: '../Customer/orderList/orderList'
        })
        break;
      case '6':
        wx.navigateTo({
          url: '../Customer/DeliveryApplication/DeliveryApplication',
        })
        break;
      case '7':
        wx.navigateTo({
          url: '../Customer/orderListForFinal/orderListForFinal',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        break;
      case '8':
        //保证金确认
        wx.navigateTo({
          url: '../Financialer/orderListForMargin/orderListForMargin'
        })
        break;
      case '9':
        //给上游支付全款
        wx.navigateTo({
          url: '../Financialer/orderListsAfterPayment/orderListsAfterPayment'
        })
        break;
      case '10':
        //尾款信息修改确认
        wx.navigateTo({
          url: '../Financialer/FinalPaymentInfoModify/FinalPaymentInfoModify',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        break;
      case '11':
        //尾款确认
        wx.navigateTo({
          url: '../Financialer/orderListForFinalPayment/orderListForFinalPayment',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        break;
      case '12':
        wx.navigateTo({
          url: '../Customer/orderListForKaiPing/orderListForKaiPing',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        break;
      case '13':
        console.log('生成二维码')
        wx.navigateTo({
          url: '../Businesser/qrCode/qrCode'
        })
        break;
      case '14':
        console.log('盘库')
        wx.navigateTo({
          url: '../Businesser/Stocktaking/Stocktaking'
        })
        break;
      // case '15':
      //   console.log('盘库')
      //   wx.navigateTo({
      //     url: '../Businesser/print/print'
      //   })
      //   break;
    }
  },
  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var numVal = that.data.num + 1;
        that.setData({
          num: numVal
        });
        console.log('setInterval==' + that.data.num);
        //发送之前
        console.log("brfore sendRq")
        console.log(this.data)

        //发起网络请求
        wx.request({
          url: app.globalData.ipAddress + app.globalData.proName + '/getMsgCount',
          data: {
            userId: app.globalData.userInfo.userId
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
              var countList = res.data.data
              that.setData({
                countLists: countList
              })
              console.log(countList)
            } else { }
          }
        })

      }, 4000);
  },
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
  onUnload: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
    if (this.data.isWsStarted) {
      that.setData({
        isWsStarted: false
      })
      wx.closeSocket()
    }
  },
  onShow: function () {
    this.startSetInter();
    //发送之前
    console.log("brfore sendRq")
    console.log(this.data)
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.ipAddress + app.globalData.proName + '/getMsgCount',
      data: {
        userId: app.globalData.userInfo.userId
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
          var countList = res.data.data
          that.setData({
            countLists: countList
          })
          console.log(countList)
        } else { }
      }
    })


  },
  onHide: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
  clearTimeInterval: function (that) {
    var interval = that.data.interval;
    clearInterval(interval)
  },
  loadWebsoc: function () {
    var that = this
    //websocket
    let socketOpen = this.isWsStarted
    var socketMsgQueue = []
    // var ipWbAddress = "ws://192.168.0.111:8081";
    var ipWbAddress = app.globalData.wbIpAddress;

    var proName = app.globalData.proName;

    var userId = app.globalData.userInfo.userId
    console.log("--------------websocketpackage--------------")
    console.log(app.globalData.userInfo)
    console.log(ipWbAddress +
      proName +
      '/websocketServer/{' + userId + '}')

    console.log("--------------websocketpackage--------------")

    wx.connectSocket({
      url: ipWbAddress +
        proName +
        '/websocketServer/{' + userId + '}',
      header: {
        'content-type': 'application/json'
      },
    })

    wx.onSocketOpen(function (res) {
      socketOpen = true
      that.setData({
        isWsStarted: true
      })

      for (let i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []

      wx.onSocketMessage(function (res) {
        console.log("------来自服务器的问候------")
        console.log(res)
        console.log("------来自服务器的信息------")
        wx.showModal({
          title: '提示',
          content: res.data,
          success: function (res) {
            if (res.confirm) { //这里是点击了确定以后
              console.log('用户点击确定')
            } else { //这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      })
      wx.onSocketClose(function (res) {
        console.log('WebSocket 已关闭！')
      })
    })

    function sendSocketMessage(msg) {
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }
  },
})
