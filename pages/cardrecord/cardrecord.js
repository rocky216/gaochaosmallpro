// pages/cardrecord/cardrecord.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weeks: ["日", "一", "二", "三", "四", "五", "六"],
    nowDate: '',
    isWeek: '',
    days: '',
    recodeCards: '',
    info: null,
    member_id: '',
    index: -1,
    members: [],
    day: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNowDate()
    this.getMember()
    this.getAllRecode()
  },
  memberHandlen: function(event){
    var value = event.detail.value
    console.log(this.data.members[value])
    this.setData({
      index: value,
      member_id: this.data.members[value]["id"]
    })
    this.getAllRecode()
  },
  getMember: function(){
    const options = {
      url: "/User/CkClock/member_list",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
      }
    }
    utils.fetch(options, (res)=>{
      this.setData({
        members: res
      })
    })
  },
  getInfo: function(event){
    var item = event.currentTarget.dataset.item
    this.setData({
      info: item.info,
      day: item.day
    })
    
  },
  handleTime: function(str){
    
    var arr = str.split("/")
    return arr[0] + "-" + arr[1]
  },
  getAllRecode: function (time = ''){
    const options={
      url: "/User/CkClock/clock_list",
      method: "post",
      data:{
        token: wx.getStorageSync('token'),
        time: this.handleTime(this.data.nowDate),
        member_id: this.data.member_id
      }
    }
    utils.fetch(options, (res)=>{
      this.setData({
        recodeCards: res
      })
      this.getDaysNum(this.data.nowDate)
    })
  },
  getNextMonth: function(){
    var arr = this.data.nowDate.split('/')
    var year = arr[0], month = arr[1]
    month = parseInt(month)+1
    if (month>12){
      year = parseInt(year)+1
      month = 1
    }
    this.setData({
      nowDate: year + "/" + month
    })
    this.getAllRecode(this.data.nowDate)
  },
  getPreMonth: function(){
    var arr = this.data.nowDate.split('/')
    var year = arr[0], month = arr[1]
    month = parseInt(month) - 1
    if (month < 1) {
      year = parseInt(year) - 1
      month = 12
    }
    this.setData({
      nowDate: year + "/" + month
    })
    this.getAllRecode(this.data.nowDate)
  },
  getDaysNum: function(date){
    var arr = []
    for (var i = 1; i <= this.getDays(date); i++) {
      var item = ''
      for (var j = 0; j < this.data.recodeCards.length;j++){
        var str = this.data.recodeCards[j]["check_time"].substring(8,10)
        
        if (str == i){
          item = this.data.recodeCards[j]
        }
      }
      arr.push({
        day: i,
        info: item
      })
    }
    this.setData({
      days: arr
    })
  },
  getDays: function(date){
    var arr = date.split('/')
    var month = arr[1], year = arr[0]
    this.setData({
      isWeek: new Date(date+"/1").getDay()
    })
    
    if (month == 2 && year%4==0){
      return 29
    }
    if (month == 2 && year % 4>0){
      return 28
    }

    if (month == 4 || month == 6 || month == 9 || month == 11){
      return 30
    }else {
      return 31
    }
  },
  getNowDate: function(){
    var d = new Date(),
        year = d.getFullYear(), month=d.getMonth()+1
        this.setData({
          nowDate: year+'/'+month
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