// pages/myapply/myapply.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaveList: [],
    purchaseList: [],
    tab: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApply()
  },
  getApply: function(event){
    var _this = this
    var tab = event?event.target.dataset.tab:1
    
    this.setData({
      tab: tab
    })
    const options = {
      url: "/User/CkClock/my_apply",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        tab: this.data.tab
      }
    }
    utils.fetch(options, function(res){
      if(tab==1){
        _this.setData({
          leaveList: res
        })
      }else {
        _this.setData({
          purchaseList: res
        })
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