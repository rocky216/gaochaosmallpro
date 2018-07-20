//index.js
//获取应用实例
const app = getApp()
var utils = require("../../utils/util.js")

Page({
  data: {
    navList: [],
    type: 1,
    host: utils.host,
    infoList: [],
    banners: []
  },
  onLoad: function () {
    this.getBanner()
    this.getNavList()
    this.getInfo()
  },
  getBanner: function(){
    var _this = this
    const options = {
      url: "/User/CkClock/banner",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
      }
    }
    utils.fetch(options, function(res){
      _this.setData({
        banners: res
      })
    })
  },
  getInfo: function (event){
    var _this = this
    if (event){
      this.setData({
        type: event.target.dataset.item.r_value
      })
    }
    
    const options = {
      url: "/User/CkClock/getHomeList",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        type: _this.data.type
      }
    }
    utils.fetch(options, function(res){
      _this.setData({
        infoList: res
      })
    })
  },
  getNavList: function(){
    var _this = this
    const options = {
      url: "/User/CkClock/ckHomeType",
      method: "post",
      data: {
        token: wx.getStorageSync('token')
      }
    }
    utils.fetch(options, function(res){
      _this.setData({
        navList: res
      })
    })
  },
  onShow: function(){
    app.isLogin()
  }
  
})
