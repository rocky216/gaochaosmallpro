// pages/login/login.js
var utils = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  usernameHandle: function (event){
    this.setData({ username: event.detail.value})
  },
  passwordHandle: function (event){
    this.setData({ password: event.detail.value })
  },
  goLogin: function(){
    var _this = this
    const options = {
      url: "/Common/CkUser/login",
      method: "post",
      data:{
        mobile: this.data.username,
        password: this.data.password
      }
    }
    utils.fetch(options,function(res){
      _this.getToken(res)
      
    })
  },
  getToken(data){
    const options={
      url: "/Common/CkUser/get_token",
      method: "post",
      data: {
        ticket: data.ticket
      }
    }
    utils.fetch(options, function(res){
      wx.setStorageSync("token", res.token)
      wx.setStorageSync("district_id", data.district_id)
      app.isLogin()
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