// pages/purchDetail/purchDetail.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
    host: utils.host,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.tab){
      this.setData({
        isShow: true
      })
    }
    this.getInfo(options.id)
  },
  agree: function (item) {
    var id = item.target.dataset.item.id
    const options = {
      url: "/User/CkClock/approval",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        tab: this.data.tab,
        id: id
      }
    }
    utils.fetch(options, function () {
      wx.showToast({
        title: '操作成功！',
        icon: 'success',
        duration: 2000
      })
    })
  },
  getInfo: function(id){
    var _this = this
    const options = {
      url: "/User/CkClock/buy_detail",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        id: id
      }
    }
    utils.fetch(options, function(res){
      _this.setData({
        detail: res
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