// pages/myReimb/myReimb.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reimbList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getReimbList()
  },
  getReimbList: function(){
    var _this = this
    const options = {
      url: "/User/CkClock/reimburseList",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        district_id: wx.getStorageSync('district_id')
      }
    }
    
    utils.fetch(options, function(res){
      _this.setData({
        reimbList: res
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