Page({
  data: {
    showTopTips: false,

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
    blList:[true,false,false],
    items: [{
        name: 'USA',
        value: '美国'
      },
      {
        name: 'CHN',
        value: '中国',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '巴西'
      },
      {
        name: 'JPN',
        value: '日本'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'TUR',
        value: '法国'
      },
    ],

    date: "2016-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false,
    formData: {

    },
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
    if (!tag ){
                this.setData({
            error: "请至少选择一项支付方式"
          })
    }
  }
});