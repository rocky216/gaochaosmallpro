// pages/detail/detail.js
var utils = require("../../utils/util.js")
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },
  getDetail: function(id){
    var _this = this;
    const options = {
      url: "/User/CkClock/home_detail",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        id: id
      }
    }
    utils.fetch(options, function(res){
      
      _this.setData({
        detail: res,
        article: res.remark // WxParse.wxParse('article', 'html', res.remark, _this, 5)
      })
      WxParse.wxParse('article', 'html', _this.data.article, _this, 5); 
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