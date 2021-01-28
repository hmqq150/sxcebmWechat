// components/popBox/popBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:"成功"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelEvent(){
      wx.showToast({
        title: '取消',
      })
      this.triggerEvent('cancelEvent',{})
    },
    sureEvent(){
      wx.showToast({
        title: '确定',
      })
      this.triggerEvent('sureEvent',{})
    },
  }
})
