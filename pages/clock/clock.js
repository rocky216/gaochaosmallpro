// pages/clock/clock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClock: true,
    isWifi: true,
    timer: null,
    info: ''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  startWifi: function () {
    var _this = this;
    wx.startWifi({
      success: function () {
        wx.getConnectedWifi({
          success: function (res) {
            console.log(res)
            console.log(res.wifi.SSID == "TP-LINK_ECFC", 666)
            if (res.wifi.SSID=="TP-LINK_ECFC"){
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
        var len = _this.getDistance(lat, lon, "27.116491", "114.90259")
        var stand = res.accuracy
        _this.setData({ info: JSON.stringify(res)})
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