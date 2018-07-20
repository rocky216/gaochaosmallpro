// pages/trackItem/trackItem.js

var utils = require("../../utils/util.js") 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    userInfo: '',
    width: '',
    height: '',
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    this.getUserInfo()
  },
  getUserInfo: function () {
    var _this = this
    const options = {
      url: "/User/CkAccount/get_user_info",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
      }
    }
    utils.fetch(options, function (res) {
      _this.setData({
        userInfo: res
      })
    })
  },
  chooseImageTap: function () {
    var _this = this
    wx.chooseImage({
      sourceType: ['camera'],
      success: function (res) {
        console.log(res)
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: (res) => {
            const { width, height, path } = res
            _this.setData({
              width: width+'px',
              height: height + 'px'
            })
            _this.DrawImage(path, width, height)
          }
        })
      }
    })
  },
  DrawImage: function (src, width, height) {
    var _this = this
    var d = new Date()
    const {userInfo } = this.data
    var src1 = userInfo.district_title + " "+userInfo.username,
      src2 = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    var ctx = wx.createCanvasContext('shenfu')
    ctx.drawImage(src, 0, 0, width, height)
    ctx.setFillStyle('red')
    ctx.font = "normal normal normal 14px KaiTi";
    ctx.fillText(src1, 10, height-50)
    ctx.fillText(src2, 10, height-30)
    ctx.stroke()
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width,
        height: height,
        destWidth: width,
        destHeight: height,
        canvasId: "shenfu",
        success: function (res) {
          _this.uploadPhoto(res.tempFilePath)
        }
      })
    })
  },
  uploadPhoto: function (filePath) {
    var _this = this
    wx.uploadFile({
      url: utils.host+"Api/User/CkClock/workClock",
      name: "img",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      filePath: filePath,
      formData: {
        "type": _this.data.type,
        "token": wx.getStorageSync('token')
      },
      success: function (res) {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        })
        // wx.switchTab({
        //   url: '/pages/track/track'
        // })
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