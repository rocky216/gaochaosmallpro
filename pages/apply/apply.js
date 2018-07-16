// pages/apply/apply.js
var app = getApp()
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    index: -1,
    startTime: '',
    money: '',
    explain: '',
    tempFilePaths: '',
    reason: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTypes()
  },
  check: function(){
    if (this.data.index < 0) {
      wx.showToast({
        title: '报销类型不能为空！',
        icon: "none"
      })
      return false
    }
    if (!this.data.reason) {
      wx.showToast({
        title: '报销事由不能为空！',
        icon: "none"
      })
      return false
    }
    if (!this.data.startTime) {
      wx.showToast({
        title: '发生时间不能为空！',
        icon: "none"
      })
      return false
    }
    if (!this.data.money) {
      wx.showToast({
        title: '费用金额不能为空！',
        icon: "none"
      })
      return false
    }
    if (!this.data.explain) {
      wx.showToast({
        title: '费用说明不能为空！',
        icon: "none"
      })
      return false
    }
    
    if (!this.data.tempFilePaths && this.data.tempFilePaths.length==0) {
      wx.showToast({
        title: '图片不能为空！',
        icon: "none"
      })
      return false
    }
    return true;
  },
  submitHandlen: function(){
    var _this = this
    if (!this.check())return;
    app.uploadimg({
      url: utils.baseUrl+"/User/CkClock/reimburseAdd",
      path: _this.data.tempFilePaths,
      formData: {
        token: wx.getStorageSync('token'),
        type: _this.data.types[_this.data.index]["r_value"],
        reason: _this.data.reason,
        occur_time: _this.data.startTime,
        cost: _this.data.money,
        remark: _this.data.explain
      },
      callback: function(){
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    })
  },
  getReason: function(event){
    console.log(event.detail.value)
    this.setData({
      reason: event.detail.value
    })
  },
  chooseImageTap: function(){
    var _this = this;
    wx.chooseImage({
      success: function(res){
        console.log(res)
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },
  getExplain: function(event){
    this.setData({
      explain: event.detail.value
    })
  },
  getMoney: function(event){
    this.setData({
      money: event.detail.value
    })
  },
  typesHandlen: function(event){
    this.setData({
      index: event.detail.value
    })
  },
  bindDateChange: function(event){
    this.setData({
      startTime: event.detail.value
    })
  },
  getTypes: function(){
    var _this = this
    const options = {
      url: "/User/CkClock/reimburseAdd",
      method: "get",
      data: {
        token: wx.getStorageSync('token')
      }
    }
    utils.fetch(options, function(res){
      _this.setData({
        types: res
      })
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