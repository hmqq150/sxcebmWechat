// pages/OrderSearch/OrderSearch.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    animated: true,
    option1: [{
        text: '订单',
        value: 0
      },
      {
        text: '货物',
        value: 1
      },
    ],
    option2: [{
        text: '待支付保证金',
        value: 'a'
      },
      {
        text: '待支付上游货款',
        value: 'b'
      },
      {
        text: '待绑定合同',
        value: 'c'
      },
      {
        text: '待入库',
        value: 'd'
      },
      {
        text: '部分入库',
        value: 'e'
      },
      {
        text: '已全部入库',
        value: 'f'
      },

      {
        text: '已结算',
        value: 'g'
      },
    ],
    value1: 0,
    value2: 'a',
    backupOption1: [{
        text: '待支付保证金',
        value: 'a'
      },
      {
        text: '待支付上游货款',
        value: 'b'
      },
      {
        text: '待绑定合同',
        value: 'c'
      },
      {
        text: '待入库',
        value: 'd'
      },
      {
        text: '部分入库',
        value: 'e'
      },
      {
        text: '已全部入库',
        value: 'f'
      },

      {
        text: '已结算',
        value: 'g'
      },
    ],

    backupOption2: [{
        text: '入库中',
        value: 'h'
      },
      {
        text: '待财务处理',
        value: 'i'
      },
      {
        text: '待支付尾款',
        value: 'j'
      },
      {
        text: '可出库(未开平)',
        value: 'k'
      },

      {
        text: '开平中',
        value: 'l'
      },

      {
        text: '可出库(已开平)',
        value: 'm'
      }, {
        text: '已出库',
        value: 'n'
      },
    ],
    lists: [],
    selectType: 0,
    selectStatus: "",
    pageIndex: 0,
    isOrder: true,
    sumTable:[],
    dataTableTitle:[],
    dataTable:[],
    prev:true,
    next:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSumList()
    this.getTableList()
  },
  //统计数据
  getSumList(){
    let _this = this
    try{
      wx.request({
        url: app.globalData.ipAddress + app.globalData.proName + '/selectSum',
        data:{
          userId:app.globalData.userInfo.userId,
          type:_this.data.selectType,
          status:_this.data.selectStatus,
          pageIndex:_this.data.pageIndex
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success(res){
          _this.setData({
            sumTable:res.data.data.statistics
          })
        }
      })
    }catch(e){
      console.log(e)
    }
  },
  // 获取表格列表
  getTableList(){
    let _this = this
    try{
      wx.request({
        url: app.globalData.ipAddress + app.globalData.proName + '/selectOrder',
        data:{
          userId:app.globalData.userInfo.userId,
          type:_this.data.selectType,
          status:_this.data.selectStatus,
          pageIndex:_this.data.pageIndex
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success(res){
          _this.setData({
            dataTableTitle:res.data.data.titles,
            dataTable:res.data.data.lines
          })
          if(_this.data.dataTable.length<5){
            console.log("xiao yu 55555")
            _this.setData({
              next:true
            })
          }else{
            _this.setData({
              next:false
            })

          }
          if(_this.data.pageIndex>0){
            _this.setData({
              prev:false,
            })
          }else{
            _this.setData({
              prev:true
            })
          }
        }
      })
    }catch(e){
      console.log(e)
    }
  },
  prevPage(){
    if(this.data.pageIndex>0){
      this.setData({
        prev:false,
        pageIndex:--this.data.pageIndex
      })
      this.getTableList()
    }else{
      this.setData({
        prev:true
      })
    }
  },
  nextPage(){
    if(this.data.dataTable=='' || this.data.dataTable.length < 5){
      this.setData({
        next:true
      })
    }else{
      this.setData({
        pageIndex:++this.data.pageIndex
      })
      this.getTableList()
    }
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
    //发送之前
    console.log("底部上滑")
    console.log(this.data)
    var that = this
    //发起网络请求
    // wx.request({
    //   url: app.globalData.ipAddress + app.globalData.proName + '/selectOrder',
    //   data: {
    //     userId: app.globalData.userInfo.userId,
    //     type: that.data.selectType,
    //     status: that.data.selectStatus,
    //     pageIndex: that.data.pageIndex
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
    //       var lii = that.data.lists
    //       for (let i = 0; i < res.data.data.length; i++) {
    //         lii.push(res.data.data[i])
    //       }
    //       that.setData({
    //         lists: lii,
    //         show:false
    //       })
    //     } else {}
    //   }
    // })
  
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
    // this.setData({
    //   pageIndex: ++this.data.pageIndex,
    //   show: true
    // })
    //发送之前
    console.log("底部上滑")
    console.log(this.data)
    // this.getSumList()
    // this.getTableList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  oadd: function(e) {
    console.log(e)
    if (e.detail == '1') {
      this.setData({
        option2: this.data.backupOption2,
        value2: 'h'
      })
    } else if (e.detail == '0') {
      this.setData({
        option2: this.data.backupOption1,
        value2: 'a'
      })
    }

    if (e.target.id == "select") {
      //select
      this.setData({
        selectType: e.detail,
        pageIndex: 0
      })
      if (e.detail == 0) {
        this.setData({
          isOrder: true,
          selectStatus:'a'
        })
      } else {
        this.setData({
          isOrder: false,
          selectStatus:'h'
        })
      }
    } else {
      //status
      this.setData({
        selectStatus: e.detail,
        pageIndex: 0
      })
    }

    this.getSumList()
    this.getTableList()
    console.log("条件变化")
  },
  // close() {
  //   this.setData({
  //     animated: !this.data.animated
  //   })
  // },
})
