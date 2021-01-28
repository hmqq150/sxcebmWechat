const app = getApp()
Page({
  data: {
    orderId: 0,
    showTopTips: false,
    cashValue: 0,
    baozhiValue: 0,
    zhangyuValue: 0,
    radioItems: [{
        name: 'cell standard',
        value: '0',
        checked: true
      },
      {
        name: 'cell standard',
        value: '1'
      }
    ],
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

    rules: [{
      name: 'radio',
      rules: {
        required: false,
        message: '单选列表是必选项'
      },
    }, {
      name: 'checkbox',
      rules: {
        required: true,
        message: '多选列表是必选项'
      },
    }, {
      name: 'name',
      rules: {
        required: true,
        message: '请输入姓名'
      },
    }, {
      name: 'qq',
      rules: {
        required: true,
        message: 'qq必填'
      },
    }, {
      name: 'mobile',
      rules: [{
        required: true,
        message: 'mobile必填'
      }, {
        mobile: true,
        message: 'mobile格式不对'
      }],
    }, {
      name: 'vcode',
      rules: {
        required: true,
        message: '验证码必填'
      },
    }, {
      name: 'idcard',
      rules: {
        validator: function(rule, value, param, modeels) {
          if (!value || value.length !== 18) {
            return 'idcard格式不正确'
          }
        }
      },
    }]
  },
  onLoad: function(e) {
    this.setData({
      orderId: e.orderId
    })
    console.log(this.data)

  },
  checkboxChange: function(e) {
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
      //submit
      //提交支付详情
      //发送之前
      console.log("brfore sendRq")
      console.log(this.data)
      //发起网络请求
      wx.request({
        url: app.globalData.ipAddress + app.globalData.proName + '/submitPayRecordForMargin',
        data: {
          id: app.globalData.userInfo.userId,
          orderId: that.data.orderId,
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
            wx.showModal({
              title: '提示',
              content: '已提交',
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

          } else {}
        }
      })



    }
  },
  formInputChange: function(e) {
    console.log(e)
    var tag = e.currentTarget.dataset.field
    if (tag == "cash") {
      this.setData({
        cashValue: e.detail.value
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

    console.log(this.data)
  }
});