// pages/wage/wage.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWage()
  },
  handlenShow: function(event){
    var index = event.target.dataset.index
    if (index == undefined) return;
    this.data.wages[index]["show"] = !this.data.wages[index]["show"]
    this.setData({
      wages: this.data.wages
    })
  },
  getDate: function(value){
    return value.substring(0,8)
  },
  getWage: function(){
    var _this = this
    const options = {
      url: "/User/CkClock/salaryList",
      method: "post",
      data: {
        token: wx.getStorageSync('token')
      }
    }
    utils.fetch(options, function(res){
      var arr = [];
      for(var attr in res){
        console.log(attr )
        res[attr]["salary_time"] = res[attr]["salary_time"].substring(0, 7)
        res[attr]["show"] = false
        arr.push(res[attr])
      }
      console.log(arr)
      _this.setData({
        wages: arr
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