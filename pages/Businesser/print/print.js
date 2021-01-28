const util = require("../../../utils/util");
const PrintUtil = require('../../../utils/printutil')
const app = getApp()

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

Page({
  data: {
    devices: [],
    connected: false,
    chs: [],
  },
  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        this.startBluetoothDevicesDiscovery()
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      }
    })
  },
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log('getBluetoothAdapterState', res)
        if (res.discovering) {
          this.onBluetoothDeviceFound()
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery()
        }
      }
    })
  },
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return
    }
    this._discoveryStarted = true
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res)
        this.onBluetoothDeviceFound()
      },
    })
  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery()
  },
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }

        const foundDevices = this.data.devices
        const idx = inArray(foundDevices, 'deviceId', device.deviceId)
        const data = {}
        if (idx === -1) {
          data[`devices[${foundDevices.length}]`] = device
        } else {
          data[`devices[${idx}]`] = device
        }
        this.setData(data)
      })
    })
  },
  createBLEConnection(e) {
    const ds = e.currentTarget.dataset
    const deviceId = ds.deviceId
    const name = ds.name
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        this.setData({
          connected: true,
          name,
          deviceId,
        })
        this.getBLEDeviceServices(deviceId)
      }
    })
    this.stopBluetoothDevicesDiscovery()
  },
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    })
  },
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        console.log("i am here ~~~~~~")
        console.log(res.services)
        console.log("i am here ~~~~~~")
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            console.log("res.service[i]: "+i)
              this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid);
          }
        }
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if (item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            if( !(app.globalData.isPrint) ){
              this.writeBLECharacteristicValue()
            }
          }
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((characteristic) => {
      const idx = inArray(this.data.chs, 'uuid', characteristic.characteristicId)
      const data = {}
      if (idx === -1) {
        data[`chs[${this.data.chs.length}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      } else {
        data[`chs[${idx}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      }
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      this.setData(data)
    })
  },
  onLoad:function(e){
      console.log(e.str)
      app.globalData.str = e.str
  },
  onUnload:function(e){
    app.globalData.isPrint = false
  },
  writeBLECharacteristicValue() {
    wx.showLoading({
      title: '正在写入...',
    })
    app.globalData.isPrint = true
    var str = app.globalData.str
    var urlsend = str.split(';')
    var strogePlace = urlsend[0]
    var steelFac = ""
    if (urlsend[1] == 0) {
      steelFac = "山西太钢不锈钢股份有限公司"
    } else {
      steelFac = "承德承钢商贸有限公司"
    }
    var pName = urlsend[2]
    var foodNo = urlsend[3]
    var caizhi = urlsend[4]
    var guige = urlsend[5]
    var piece = urlsend[6]
    var weight = urlsend[7]
    var gangNo = urlsend[8]
    var itemId = urlsend[9]
    var orderId = urlsend[10]

    let siteCode = "订单号 "+orderId;
    let code = str
    let itemName = "山商智慧库";
    let printUtil = new PrintUtil(1000, 1);
    // printUtil.printlnText(4, 490, 5, "快递");
    // printUtil.printlnText(4, 490, 38, "包裹");
    //时间
    let timeTitle = util.formatTime(new Date());
    //printUtil.printlnText(1, 30, 70, timeTitle);
    //页码
    //printUtil.printlnText(55, 230, 70, "第1/1页");
    //最外框
    printUtil.printBox(10, 100, 550, 900);
    // //第一行第一个
    printUtil.printBox(10, 100, 430, 200);
    // //第一行第二个
    //第一行第三个到底
    printUtil.printBox(430, 100, 550, 900);
    //第二行
     printUtil.printBox(10, 200, 430, 300);
    // //第三行
    // printUtil.printBox(10, 300, 430, 370);
    // //第四行
    // printUtil.printBox(10, 370, 430, 490);
    //第五行第一个
    printUtil.printBox(10, 690, 230, 900);
    //第五行第二个
    printUtil.printBox(230, 690, 430, 900);
    //加粗字体
    printUtil.setFontWidthAndHeight(2, 2);
    printUtil.printlnText(55, 80, 115, siteCode);
    //关闭加粗
    printUtil.setFontWidthAndHeight(1, 1);
    //打印横向条码和文字
    printUtil.printSweepCodeAndText(50, 205, 58, foodNo);
    //纵向打印条码和文字
    printUtil.printSweepCodeAndTextVertical(450, 880, 95, foodNo);

    printUtil.setFontWidthAndHeight(1.5, 1.5);
    printUtil.printlnText(4, 30, 310, "山西商品电子交易中心");
    printUtil.setFontWidthAndHeight(1,1);

    printUtil.printlnText(4, 30, 370, "品名");
    printUtil.printlnText(4, 130, 370,pName);
    
    printUtil.printlnText(4, 30, 410, "钢卷号");
    printUtil.printlnText(4, 130, 410, foodNo);
    printUtil.printlnText(4, 30, 450, "仓储号");
    printUtil.printlnText(4, 130, 450, gangNo);
    printUtil.printlnText(4, 30, 490, "材质");
    printUtil.printlnText(4, 130, 490, caizhi);
    printUtil.printlnText(4, 30, 530, "规格");
    printUtil.printlnText(4, 130, 530, guige);
    printUtil.printlnText(4, 30, 570, "吨数");
    printUtil.printlnText(4, 130, 570, weight);
    printUtil.printlnText(4, 30, 610, "块数");
    printUtil.printlnText(4, 130, 610, piece);

    //寄件地址
    // printUtil.printlnText(4, 30, 520, "寄");
    // printUtil.printlnText(4, 80, 520, mailName);
    // printUtil.printlnText(8, 50, 580, mailPhone);
    //签字栏
    // printUtil.printlnText(55, 160, 670, "签字栏");
    //二维码
    printUtil.printQRCode(235, 697, 5, code);
    //文件名称
    printUtil.setFontWidthAndHeight(2, 2);
    printUtil.printlnText(55, 10, 720, itemName);
    printUtil.setFontWidthAndHeight(1, 1);
    //备注
    // printUtil.printlnText(8, 10, 780, remark);
    //已验视
    // printUtil.printlnText(55, 480, 900, "已验视");
    //技术支持
    printUtil.setAlign("center")
    printUtil.printlnText(4, 0, 950, "本小程序由山商科创提供技术支持");

    let buffer = printUtil.getData();
    const maxChunk = 20;
    const delay = 20;
    for (let c = 0; c < buffer.length; c++) {
      for (let i = 0, j = 0, length = buffer[c].byteLength; i < length; i += maxChunk, j++) {
        let subPackage = buffer[c].slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
        console.log(subPackage)
        setTimeout(this._writeBLECharacteristicValue, delay, subPackage);
      }
    }
    wx.hideLoading();
  },
  _writeBLECharacteristicValue(buffer) {
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._serviceId,
      characteristicId: this._characteristicId,
      value: buffer,
      success(res) {
        console.log('writeBLECharacteristicValue success', res)
      },
      fail(res) {
        console.log('writeBLECharacteristicValue fail', res)
      },
    })
  },

  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter()
    this._discoveryStarted = false
  },
})
