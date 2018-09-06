const app = getApp();

const baseUrl = "https://www.jiajgou.com/Api";
const host = "https://www.jiajgou.com/"

// const baseUrl = "http://192.168.1.108/gaochao/Api";
// const host = "http://192.168.1.108/gaochao/"


function extend(settings, opt) {
  for (var attr in opt) {
    settings[attr] = opt[attr];
  }
}

function fetch(opt, next, type = false) {
  //ajax请求

  var settings = {
    url: "",
    data: "",
    method: "get"
  };

  extend(settings, opt);

  var cache_key = settings.url + JSON.stringify(settings.data);
  var cache_data = wx.getStorageSync(cache_key);

  wx.showLoading({
    title: "加载中"
  });
  // if (!cache_data || type){
  if (true) {
    wx.request({
      url: baseUrl + settings.url,
      data: settings.data,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: settings.method,
      success: function (res) {
        var data = res.data;
        wx.hideLoading();
        if (data.status=="0") {
          wx.showToast({
            title: data.msg || "请求失败",
            icon: "none",
            duration: 1500
          });
          
        } else if (data.status == "-1" || data.status == "-2"){
          wx.reLaunch({
            url: "/pages/login/login"
          })
        } else{
          next(data.info);
          // wx.setStorageSync(cache_key, data.res)
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showToast({
          title: "网路错误",
          icon: "none",
          duration: 1500
        });
      }
    });
  } else {
    wx.hideLoading();
    next(wx.getStorageSync(cache_key));
    console.log("%c" + cache_key, "color:green");
  }
}

module.exports = {
  fetch: fetch,
  baseUrl: baseUrl,
  host: host
}
