// pages/trackItem/trackItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  chooseImageTap: function () {
    var _this = this
    wx.chooseImage({
      sourceType: ['camera'],
      success: function (res) {
        console.log(res)
        _this.uploadPhoto(res.tempFilePaths[0])
      }
    })
  },
  uploadPhoto: function (filePath) {
    var _this = this
    wx.uploadFile({
      url: "http://192.168.1.106/gaochao/Api/User/CkClock/workClock",
      name: "img",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      filePath: filePath,
      formData: {
        "type": "1",
        "token": wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res, 666)
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