// pages/clock/clock.js
var utils = require("../../utils/util.js")
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClock: true,
    isWifi: true,
    timer: null,
    info: '',
    flagStatus: '',
    workStartTime: '',
    workEndTime: '',
    state:false,
    lat: '',
    lon: '',
    wifi: ''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showModal({
    //   title: '12',
    //   content: '12',
    // })
  },
  transfor: function(time, type=true){
    var d = new Date()
    var y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate()
    var d2 = new Date(y + '/' + m + '/' + day+' '+time)
    if(type){
      return d > d2 ? true : false
    }else{
      return d2
    }
    
  },
  clockHandle: function(){
    var nowTime = new Date()
    var _this = this
    if (this.data.flagStatus == 1 && !this.transfor(this.data.workEndTime)){
      wx.showModal({
        title: '你早退了',
        content: '是否打卡？',
        success: function (data) {
          if (data.confirm) {
            _this.getClock()
          }
        }
      })
      return 
    }
    if (this.transfor(this.data.workStartTime) && !this.transfor("12:00")){
      wx.showModal({
        title: '你迟到了',
        content: '是否打卡？',
        success: function(data){
          if (data.confirm){
            _this.getClock()
          }
        }
      })
    } else if (this.transfor("12:00") && this.transfor(this.data.workEndTime)){
      wx.showModal({
        title: '你早退了',
        content: '是否打卡？',
        success: function (data) {
          if (data.confirm) {
            _this.getClock()
          }
        }
      })
    }

  },
  getClock: function(){
    var _this=this
    const options = {
      url: "/User/CkClock/clock",
      method: "post",
      data: {
        token: wx.getStorageSync('token')
      }
    }
    utils.fetch(options, function(res){
      wx.showToast({
        title: "打卡成功",
        success: function(){
          setTimeout(function(){
            _this.whetherClock()
          },1500)
        }
      })
     
    })
  },
  whetherClock:function(){
    var _this = this
    const options={
      url: "/User/CkClock/checkClock",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        district_id: wx.getStorageSync('district_id')
      }
    }
    utils.fetch(options, function(res){
      console.log(res.state)
      if (parseInt(res.state)>1){
        _this.setData({
          state: true
        })
      }else{
        _this.setData({
          flagStatus: res.ck_clock,
          workStartTime: res.ck_model[0]["clock_time"],
          workEndTime: res.ck_model[1]["clock_time"],
          lat: res["ck_range"][0]["latitude"],
          lon: res["ck_range"][0]["longitude"],
          wifi: res["ck_range"][0]["mac"],
        })
      }
    })
  },
  startWifi: function () {
    var _this = this;
    wx.startWifi({
      success: function () {
        wx.getConnectedWifi({
          success: function (res) {
            if (res.wifi.BSSID==_this.data.wifi){
              _this.setData({ isWifi: false })
            }else{
              _this.setData({ isWifi: true })
            }
          }
        })
      }
    })
  },
  getLatLon: function(){
    var _this = this
    wx.getLocation({
      type: "gcj02",
      success: function(res){
        var lat = res.latitude
        var lon = res.longitude
        var len = _this.getDistance(lat, lon, _this.data.lon, _this.data.lat)
        var stand = res.accuracy
        _this.setData({ info: JSON.stringify(res)})

        console.log(len, stand)
        if (len <= stand){
          _this.setData({isClock: false})
        }else{
          _this.setData({ isClock: true })
        }
      }
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
    this.whetherClock()
    var _this = this;
    this.timer = setInterval(function () {
      _this.getLatLon()
      _this.startWifi()
    }, 3000)

    // let len = this.getDistance("27.1448", "114.99457", "27.12", "114.8977" )
    // console.log(len)
  },
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;
    var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));

    /*if (distance > 1000){
      distance = Math.round(distance / 1000);
    }*/

    return distance;
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.timer)
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
  
  }
})