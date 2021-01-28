const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ddata:"",
    displayData:"",
    itemId: 0,
    cashValue: 0,
    baozhiValue: 0,
    zhangyuValue: 0,
    list:[],
    noList: [],
    modefyList: [],
    workNo: 0,
    typeS: false,
    show: true,
    dataPackage: [{
      "name": 1
    }],
    buttons: [{
        type: 'default',
        className: '',
        text: '辅助操作',
        value: 0
      },
      {
        type: 'primary',
        className: '',
        text: '主操作',
        value: 1
      }
    ],
    switchTypeTag: false,
    dealPrice: "",
    switchBaozhengJinValue: false,
    orderData: [],
    money:0,
    customerMoney:0,
    switchMoneyTypeTag:false,
    value:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var workNo = app.globalData.selectFinalCala.workNo
    var that = this
    console.log(options)
    console.log(id)
    this.setData({
      ddata: app.globalData.selectFinalCala,
      FinalCalaId: id,
      workNo: workNo,
      customerMoney:app.globalData.selectFinalCala.customerMoney,
      value:app.globalData.selectFinalCala.value
    })
    var list = []
    var idList = []
    var noList = this.data.ddata.content
    console.log("-------------")
    console.log(noList)

    for (let i = 0; i < noList.length; i++) {
      console.log("41241242412")

      var index = idList.indexOf(noList[i].typeItemId)
      if (index == -1) {
        idList.push(noList[i].typeItemId)
        //list.push(noList[i])
        var item = {};
        item.caizhi = noList[i].caizhi
        item.guige = noList[i].guige
        item.weight = Number(noList[i].weight)
        var foodList = {}
        foodList.insideNo = noList[i].insideNo
        foodList.foodNo = noList[i].foodNo
        foodList.foodId = noList[i].foodId
        item.isHasDealPrice = noList[i].isHasDealPrice
        item.dealPrice = noList[i].dealPrice
        item.price = noList[i].price

        item.noList = []
        item.noList.push(foodList)
        item.typeItemId = noList[i].typeItemId
        item.id = list.length
        item.orderId = this.data.orderId
        item.count = 1
        if(! item.isHasDealPrice ){
          item.status = "未录入结算价"
          item.hasValue = false
        }else{
          item.status = "已录入结算价"
          item.hasValue = true
        }

        list.push(item)
        console.log("first Node")
      } else {
        for (let j = 0; j < list.length; j++) {
          if (list[j].typeItemId == noList[i].typeItemId) {
            var item = list[j]
            console.log("当前weigtht" + item.weight)
            console.log("新增节点weigtht" + noList[i].weight)
            item.weight = item.weight + Number(noList[i].weight)
              ++item.count
            var foodList = {}
            foodList.insideNo = noList[i].insideNo
            foodList.foodNo = noList[i].foodNo
            foodList.foodId = noList[i].foodId

            item.noList.push(foodList)
            //更新元素   j位置 删除1哥元素 将item插入到该位置
            list.splice(j, 1, item)
            console.log("first same updsata Node")

          }
        }
      }
    }

    this.setData({
      list: list,
      idList: idList,
      
    })
    app.globalData.waitForNoteList = list
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
    console.log(app.globalData.dateData)
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

  // confirm: function(e) {
  //   console.log(e)
  //   wx.navigateTo({
  //     url: '../FinalPaymentInfoModifyDetail/FinalPaymentInfoModifyDetail?recId=' + e.currentTarget.id,
  //     success: function(res) {},
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // }
  confirm: function(e) {
    console.log(e)
    this.setData({
      typeS: true,
      itemId: e.target.id
    })
  },
  formSubmit: function(e) { //确定按钮执行此提交事件
    console.log(e.detail.value)
    //写你的逻辑代码
    wx.showToast({
      title: '修改成功',
      icon: 'success'
    })
    this.setData({
      show: false
    })
  },
  btnconfirm: function(e) {
    console.log(e)
    if (this.data.dealPrice != "") {
      var list = this.data.list
      list[this.data.itemId].isHasDealPrice = true
      list[this.data.itemId].dealPrice = this.data.dealPrice
      list[this.data.itemId].status = "已经录入结算价"

      this.setData({
        list: list,
        typeS: false,
        dealPrice:0
      })
    }
  },
  switchType: function(e) {
    console.log(e)
    this.setData({
      switchTypeTag: !(this.data.switchTypeTag)
    })
    console.log(this.data.switchTypeTag)
    if (this.data.switchTypeTag) {
      wx.navigateTo({
        url: '../FinalPaymentInfoModifyDetail/FinalPaymentInfoModifyDetail?FinalCalaId=' + this.data.FinalCalaId,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  switchMoneyType: function(e) {
    console.log(e)
    this.setData({
      switchMoneyTypeTag: !(this.data.switchMoneyTypeTag)
    })
    console.log(this.data.switchMoneyTypeTag)
    if (this.data.switchMoneyTypeTag) {
      wx.navigateTo({
        url: '../FinalDetail/FinalDetail?FinalCalaId=' + this.data.FinalCalaId+"&customerMoney="+this.data.customerMoney+"&value="+this.data.value+"&status="+this.data.ddata.status,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  formInputChange: function(e) {
    console.log(e)
    this.setData({
      dealPrice: e.detail.value
    })

  },
  btncancel: function(e) {
    this.setData({
      typeS: false
    })
  },
  submitForm: function(e) {
    var orderData = {}
    orderData.dateData = app.globalData.dateData
    orderData.orderId = this.data.ddata.orderId
    // orderData.FinalCalaId = this.data.FinalCalaId
    // orderData.switchBaozhengJin = this.data.switchBaozhengJinValue
    var liss = this.data.list
    var dataPackage = []
    for (let i = 0; i < liss.length; i++) {
      var item = liss[i]
      var priceItem = {}
      priceItem.typeItemId = item.typeItemId
      priceItem.noList = item.noList
      // priceItem.price = item.price
      // priceItem.isHasDealPrice = item.isHasDealPrice
      // priceItem.dealPrice = item.dealPrice
      dataPackage.push(priceItem)
    }

    this.setData({
      orderData: orderData,
      dataPackage: dataPackage
    })
    if (this.data.switchTypeTag) {
      console.log("============")
      console.log(this.data.orderData)
      console.log(this.data.dataPackage)
      var that = this
      //发起网络请求
      wx.request({
        url: app.globalData.ipAddress + app.globalData.proName + '/FoodOutPriceCalc',
        data: {
          userId:app.globalData.userInfo.userId,
          finalCalaId:that.data.FinalCalaId,
          orderData: orderData,
          data: that.data.dataPackage,
          money:that.data.money
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success(res) {
          console.log("-=-=-=-=-=-=")
          console.log("after sendRq")
          var code = res.data.error_code
          var ress = res
          if (code == 0) {
            console.log("successful")
            wx.showModal({

              title: '提示',

              content: "信息已经提交",

              success: function(res) {
                if (res.confirm) { //这里是点击了确定以后
                  console.log('用户点击确定')
                  console.log(ress)

                  var value = ress.data.data.value
                  console.log(value)
                  wx.showModal({
                    title: '提示',
                    content: '计算价格为' + value,
                    showCancel: false,
                    cancelText: '',
                    cancelColor: '',
                    confirmText: '确定',
                    confirmColor: '',
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {
                      wx.navigateBack({
                        delta: 1,
                      })
                    },
                  })
                } else { //这里是点击了取消以后
                  console.log('用户点击取消')
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              }
            })
          } else {}
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先录入计息日期',
        showCancel: true,
        cancelText: '',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  switchBaozhengJin: function(e) {
    this.setData({
      switchBaozhengJinValue: !(this.data.switchBaozhengJinValue)
    })
  },
  formInputChangee:function(e){
    console.log(e)
    this.setData({
      money:e.detail.value
    })
  }
})