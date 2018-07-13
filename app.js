//app.js
App({
  onLaunch: function() {
    // this.isLogin()
  },
  isLogin: function(){
    var token = wx.getStorageSync('token')
    if (token){
      wx.switchTab({
        url: "/pages/index/index"
      })
    }else{
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
  },
  globalData: {
    userInfo: null
  }
})