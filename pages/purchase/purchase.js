// pages/baoxiao/baoxiao.js
var app = getApp()
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason: '',
    deliver_time: '',
    img: '',
    tempFilePaths: '',
    details: [
      {
        name: '',
        model_spec: '',
        num: '',
        money: '',
        remark: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  submitHandlen: function(){
    if (!this.check()) return;
    var _this = this;
    app.uploadimgBuy({
      url: utils.baseUrl + "/User/CkClock/buy",
      path: _this.data.tempFilePaths,
      formData: {
        token: wx.getStorageSync('token'),
        deliver_time: _this.data.deliver_time,
        reason: _this.data.reason,
        details: JSON.stringify(_this.data.details)
      },
      callback: function () {
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    })
  },
  check: function(){
    if (!this.data.reason){
      wx.showToast({ title: '申请事由不能为空！',icon: "none",duration: 1500})
      return false
    }
    if (!this.data.deliver_time) {
      wx.showToast({ title: '期望交付日期不能为空！', icon: "none", duration: 1500 })
      return false
    }
    if (!(this.data.tempFilePaths && this.data.tempFilePaths.length > 0)){
      wx.showToast({ title: '请上传附件！', icon: "none", duration: 1500 })
      return false
    }
    if (!this.checkList()){
      wx.showToast({ title: '采购明细单项不能为空！', icon: "none", duration: 1500 })
      return false
    }
    return true
  },
  checkList: function(){
    var arr = this.data.details
    var bStop = true
    for (var index in arr){
      for (var attr in arr[index]){
        if (!arr[index][attr]) {
          bStop = false
          return bStop
        }
      }
    }
    return bStop
  },
  chooseImageTap: function () {
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },
  getName: function(event){
    this.getDetails(event, "name")
  },
  getModelSpec: function (event){
    this.getDetails(event, "model_spec")
  },
  getNum: function (event){
    this.getDetails(event, "num")
  },
  getMoney: function (event){
    this.getDetails(event, "money")
  },
  getRemark: function (event){
    this.getDetails(event, "remark")
  },
  getDetails: function(event,attr){
    var index = event.target.dataset.index
    this.data.details[index][attr] = event.detail.value
    this.setData({
      details: this.data.details
    })
  },
  getReason: function(event){
    this.setData({
      reason: event.detail.value
    })
  },
  getDeliverTime: function(event){
    this.setData({
      deliver_time: event.detail.value
    })
  },
  delete: function(event){
    if (this.data.details.length==1) return;
    var index = event.target.dataset.index;
    this.data.details.splice(index, 1)
    
    this.setData({
      details: this.data.details
    })
  },
  addDetail: function(){
    var detailJson = {
      name: '',
      model_spec: '',
      num: '',
      money: '',
      remark: ''
    }
    this.data.details.push(detailJson)
    this.setData({
      details: this.data.details
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