//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navList: ["华庭物业", "庐陵公馆", "庐陵公馆A", "庐陵公馆B", "庐陵公馆C", "庐陵公馆D"]
  },
  onLoad: function () {
    app.isLogin()
  },
  
})
