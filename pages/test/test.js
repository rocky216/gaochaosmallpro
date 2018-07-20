// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getImageInfo({
      src: "/images/banner_01.jpg",
      success: (res)=>{
        console.log(res)
        const { width, height, path} = res
        this.DrawImage("/"+path, width, height)
      }
    })
  },
  DrawImage: function (src, width, height){
    var ctx = wx.createCanvasContext('shenfu')

    ctx.drawImage(src, 0, 0, width, height)
    ctx.setFillStyle('#fff')
    ctx.font = "normal normal normal 20px KaiTi";
    ctx.fillText("年阿斯达", 100, 100)
    ctx.stroke()
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width,
        height: height,
        destWidth: width,
        destHeight: height,
        canvasId: "shenfu",
        success: function (res) {
          console.log(res)
        }
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