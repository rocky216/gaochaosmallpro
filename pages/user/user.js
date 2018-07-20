// pages/user/user.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: utils.host,
    userInfo: '',
    funcTypes:[
      {
        title: "请假",
        url: '/pages/reimb/reimb',
        image: '/images/leave.png'
      },
      {
        title: "采购",
        url: '/pages/purchase/purchase',
        image: '/images/user_declare.png'
      },
      {
        title: "报销",
        url: '/pages/apply/apply',
        image: '/images/reimb.png'
      },
      {
        title: "打卡记录",
        url: '/pages/cardrecord/cardrecord',
        image: '/images/recode.png'
      }, 
      {
        title: "工资记录",
        url: '/pages/wage/wage',
        image: '/images/wage.png'
      },
      {
        title: "我的申请",
        url: '/pages/myapply/myapply',
        image: '/images/my_apply.png'
      },
      {
        title: "我的审批",
        url: '/pages/myapproval/myapproval',
        image: '/images/my_approval.png'
      },
      {
        title: "我的报销",
        url: '/pages/myReimb/myReimb',
        image: '/images/my_reimb.png'
      },
      {
        title: "修改密码",
        url: '/pages/forgetpwd/forgetpwd',
        image: '/images/forgetPsw.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  uploadHead: function(){
    var _this = this
    wx.chooseImage({
      success: function(res){
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: _this.data.host+"/Api/User/CkAccount/upload_headimg",
          filePath: tempFilePaths[0],
          name: 'headimg',
          formData: {
            token: wx.getStorageSync('token'),
          },
          success: function(data){
            _this.getUserInfo()
          }
        })
      }
    })
  },
  getUserInfo: function(){
    var _this = this
    const options = {
      url: "/User/CkAccount/get_user_info",
      method: "post",
      data: {
        token: wx.getStorageSync('token'),
      }
    }
    utils.fetch(options, function(res){
      _this.setData({
        userInfo: res
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