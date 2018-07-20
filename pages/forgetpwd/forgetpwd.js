// pages/forgetpwd/forgetpwd.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    repassword: '',
    oldpassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  submitHandlen: function(){
    var _this = this
    const options = {
      url: "/User/CkAccount/change_password",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        oldpassword: _this.data.oldpassword,
        password: _this.data.password,
        repassword: _this.data.repassword
      }
    }
    utils.fetch(options, function(res){
      wx.showToast({
        title: '修改密码成功',
        icon: 'none',
        duration: 1500
      })
      wx.switchTab({
        url: '/pages/user/user'
      })
    })
  },
  getOldpwd: function (event){
    this.setData({
      oldpassword: event.detail.value
    })
  },
  getpwd: function(event){
    this.setData({
      password: event.detail.value
    })
  },
  getrepwd: function (event){
    this.setData({
      repassword: event.detail.value
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