// pages/myapproval/myapproval.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaveList: [],
    purchaseList:[],
    tab: 1,
    job: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApproval()
  },
  
  agree: function(item){
    console.log(item)
    var id = item.target.dataset.item.id
    var type = item.target.dataset.type
    var _this = this
    const options = {
      url: type == 1 ? "/User/CkClock/approval" :"/User/CkClock/refuse", //refuse
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        tab: this.data.tab,
        id: id
      }
    }
    utils.fetch(options, function(){
      wx.showToast({
        title: '操作成功！',
        icon: 'success',
        duration: 2000
      })
      _this.getApproval()
    })
  },
  getApproval: function(event){
    var _this = this
    if(event){
      this.setData({
        tab: event.target.dataset.tab
      })
    }
    const options = {
      url: "/User/CkClock/my_approval", 
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        tab: this.data.tab
      }
    }
    utils.fetch(options, function(res){
      if(_this.data.tab==1){
        _this.setData({
          leaveList: res.approval,
          job: res.job
        })
      }else{
        _this.setData({
          purchaseList: res.approval,
          job: res.job
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