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
  uploadimg: function (data){
    
    var that= this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    data.formData.reimburse_id = that.globalData.reimburse_id
    
    wx.uploadFile({
      url: data.url,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      filePath: data.path[i],
      name: 'img',   //这里根据自己的实际情况改
      formData: data.formData,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(JSON.parse(resp.data), 12121)
        that.globalData.reimburse_id = JSON.parse(resp.data).info.reimburse_id
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用    
          that.globalData.reimburse_id="0" 
          data.callback()     
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
  uploadimgBuy: function (data) {

    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    data.formData.buy_id = that.globalData.buy_id
    console.log(data.formData.buy_id, 6666)
    wx.uploadFile({
      url: data.url,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      filePath: data.path[i],
      name: 'img',   //这里根据自己的实际情况改
      formData: data.formData,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp, 12121)
        that.globalData.buy_id = JSON.parse(resp.data).info.buy_id
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用    
          that.globalData.buy_id = "0"
          data.callback()
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    reimburse_id: "0",
    buy_id: "0"
  }
})