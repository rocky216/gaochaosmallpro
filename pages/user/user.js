// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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