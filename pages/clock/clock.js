// pages/clock/clock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/clock.png",
      id: 0,
      latitude: 27.12,
      longitude: 114.8977,
      width: 50,
      height: 50
    }],
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // wx.chooseLocation({
    //   success: function (res) {
    //     console.log(res)
    //   },
    // })
    
  },
  clock: function(){
    wx.getLocation({
      type: "wgs84",
      success: function(res){
        console.log(res)

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
    let len = this.getDistance("27.12", "114.8977", "27.12005", "114.89775")
    console.log(len)
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
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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