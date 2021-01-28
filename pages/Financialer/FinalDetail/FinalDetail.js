const app = getApp()
Page({
  data: {
    recId: 0,
    showTopTips: false,
    cashValue: 0,
    baozhiValue: 0,
    zhangyuValue: 0,
    checkboxItems: [{
      name: '现金',
      value: '0',
      checked: true
    },
    {
      name: '保值',
      value: '1'
    }, {
      name: '帐余',
      value: '2'
    }
    ],
    blList: [true, false, false],
    customerMoney: 0,
    totalValue: 0,
    valuee: 0,
    status: 10,
  },
  onLoad: function (e) {
    console.log(e)
    var customerMoney = 0
    if (e.customerMoney != null) {
      customerMoney = e.customerMoney
    } else {
      customerMoney = 0
    }
    var value = 0
    if (e.value != null) {
      value = e.value
    } else {
      value = 0
    }
    this.setData({
      recId: e.FinalCalaId,
      customerMoney: customerMoney,
      valuee: value,
      status: e.status
    })
    console.log(e)

    console.log(this.data)
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    console.log('blList携带value值为：', this.data.blList);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].checked) {
        var localList = this.data.blList
        if (i == 0) {
          this.setData({
            blList: [true, localList[1], localList[2]]
          })
        } else if (i == 1) {
          this.setData({
            blList: [localList[0], true, localList[2]]
          })
        } else if (i == 2) {
          this.setData({
            blList: [localList[0], localList[1], true]
          })
        }
      } else {
        var localList = this.data.blList
        if (i == 0) {
          this.setData({
            blList: [false, localList[1], localList[2]]
          })
        } else if (i == 1) {
          this.setData({
            blList: [localList[0], false, localList[2]]
          })
        } else if (i == 2) {
          this.setData({
            blList: [localList[0], localList[1], false]
          })
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems,
      [`formData.checkbox`]: e.detail.value
    });
  },

  submitForm() {
    var that = this
    // this.selectComponent('#form').validate((valid, errors) => {
    //   console.log('valid', valid, errors)
    //   if (!valid) {
    //     const firstError = Object.keys(errors)
    //     if (firstError.length) {
    //       this.setData({
    //         error: errors[firstError[0]].message
    //       })

    //     }
    //   } else {
    //     wx.showToast({
    //       title: '校验通过'
    //     })
    //   }
    // })
    // this.selectComponent('#form').validateField('mobile', (valid, errors) => {
    //     console.log('valid', valid, errors)
    // })
    var tag = this.data.blList[0] || this.data.blList[1] || this.data.blList[2];
    if (!tag) {
      this.setData({
        error: "请至少选择一项支付方式"
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请确认金额输入无误',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //submit
            //提交支付详情
            //发送之前
            console.log("brfore sendRq")
            //发起网络请求
            wx.request({
              url: app.globalData.ipAddress + app.globalData.proName + '/submitPayRecordForFinal',
              data: {
                id: app.globalData.userInfo.userId,
                recId: that.data.recId,
                cashValue: that.data.cashValue,
                baozhiValue: that.data.baozhiValue,
                zhangyuValue: that.data.zhangyuValue,
                isConfirm: true
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
                  if (that.data.status == 0) {
                    wx.navigateBack({
                      delta: 1,
                    })
                  } else if (that.data.status == 3) {
                    wx.navigateBack({
                      delta: 2,
                    })
                  }

                } else {
                }
              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  formInputChange: function (e) {
    console.log(e)
    var tag = e.currentTarget.dataset.field
    if (tag == "cash") {
      var vv = this.data.cashValue + this.data.baozhiValue + this.data.zhangyuValue
      this.setData({
        cashValue: e.detail.value,
      })
    } else if (tag == "baozhi") {
      this.setData({
        baozhiValue: e.detail.value
      })
    } else if (tag == "zhangyu") {
      this.setData({
        zhangyuValue: e.detail.value
      })
    }
    var vv = Number(this.data.cashValue)
      + Number(this.data.baozhiValue)
      + Number(this.data.zhangyuValue)

    this.setData({
      totalValue: vv
    })
    console.log(this.data)

  }
});
