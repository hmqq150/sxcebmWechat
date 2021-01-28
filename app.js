//app.js
const app = getApp()
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //identity  0 。业务人员    1 。客户    2  。财务人员
  globalData: {
    selectList:"",//这个参数加的很tm脑残但是暂时想不到别的办法了
    selectFinalCala:"",//tongshang
    waitForNoteList:[],
    userInfo: null,
    identity:0,
    // ipAddress: "https://aa72233b-83d4-4a19-b12b-e2a590136476.mock.pstmn.io",
    ipAddress: "http://192.168.1.123:8082",
     proName: "",
    wbIpAddress: "ws://192.168.1.123:8082",

    // ipAddress: "https://www.sxcebm.com:26001",
    // proName: "/spmserver",
    // wbIpAddress: "wss://www.sxcebm.com:26001",
    strogeeInfo:[],
    steelFacList:[],
    companyList:[],
    dateData:{},
    systemInfo:[],
    str:"",
    isPrint:false
  }
})