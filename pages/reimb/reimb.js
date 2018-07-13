var app = getApp()
var utils = require("../../utils/util.js")
// pages/reimb/reimb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    types: ['美国', '中国', '巴西', '日本'],
    customItem: "12",
    startTime: '', //'2017-09-01'
    endTime:'',
    startTimeArray: [],
    cause: '',
    totalDay: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createTime()
    this.getLeaveType()
  },
  submitHandle: function(){
    var _this = this
    const { types, cause, startTime, endTime, index, totalDay} = this.data
    if (this.getdaysCount(startTime, endTime)==0){
      wx.showToast({
        title: '开始时间不能小于技术时间',
        icon: 'none',
        duration: 1500
      })
      return
    }
    
    const options = {
      url: "/User/CkClock/leave",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
        type: index>-1?types[index]["r_value"]:'',
        start_time: this.timeHandlen(startTime),
        end_time: this.timeHandlen(endTime),
        num_day: totalDay,
        remark: cause,
      }
    }
    utils.fetch(options, function(){
      wx.switchTab({
        url: '/pages/user/user'
      })
    })
  },
  getdaysCount: function(time1, time2){
    var arr1 = time1.split('/'), arr2 = time2.split('/')
    var days = (new Date(arr2[0]) - new Date(arr1[0])) / (1000 * 60 * 60 * 24)
    var smallDay = 0
    if (days<0){
      return 0
    }
    if (arr1[1]==arr2[1]){
      smallDay = 0.5
    }else{
      smallDay = 1
    }
    return days + smallDay
  },
  timeHandlen: function(time, type=true){
    var arr = time.split('/')
    if(type){
      if (arr[1] == "上午") {
        return arr[0] + ' ' + '8:00:00'
      } else if (arr[1] == "下午") {
        return arr[0] + ' ' + '17:00:00'
      }
    }
    
  },
  textareaHandle: function(event){
    this.setData({ cause: event.detail.value})
  },
  getLeaveType: function(){
    var _this = this
    const options = {
      url: "/User/CkClock/leave",
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

  createTime: function(){
    var d = new Date()
    var y = d.getFullYear()
    var arrTot=[]
    var dateArr = []
    dateArr = dateArr.concat(this.getDays(y))
    dateArr = dateArr.concat(this.getDays(y+1) )
    
    arrTot.push(dateArr)
    arrTot.push(["上午","下午"])
    this.setData({
      startTimeArray: arrTot
    })
  },
  getDays(year){
    var _this = this
    var arr=[]
    var d = new Date()
    var nowYear = d.getFullYear(), nowMonth = d.getMonth()+1;
    var nowI = year == nowYear ? nowMonth:1;
    
    for (var i = nowI;i<=12;i++){
      for (var j = 1; j <= _this.judgeDay(year,i); j++){
        var geti = i<10?'0'+i:i
        var getj = j < 10 ? '0' + j : j
        arr.push(year + '-' + geti + '-' + getj)
      }
    }
    return arr
  },
  judgeDay: function(year, month){
    if (month == 2 && year%4==0){
      return 29
    }
    if (month == 2 && year % 4>0) {
      return 28
    }
    if (month == 4 || month == 6 || month == 9 || month == 11){
      return 30
    }else {
      return 31
    }
  },
  bindPickerChange: function(event){
    this.setData({ index: event.detail.value})
  },
  bindDateChangeStart: function(event){
    var value = event.detail.value
    var startTime =this.data.startTimeArray[0][value[0]] + '/' + this.data.startTimeArray[1][value[1]]
    this.setData({
      startTime: startTime
    })
  },
  bindDateChangeEnd: function (event){
    if (!this.data.startTime) {
      wx.showToast({
        title: '请选择开始时间！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var value = event.detail.value
    var endTime = this.data.startTimeArray[0][value[0]] + '/' + this.data.startTimeArray[1][value[1]]
    var count = this.getdaysCount(this.data.startTime, endTime)
    this.setData({
      endTime: endTime,
      totalDay: count
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