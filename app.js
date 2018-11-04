//app.js

const AV = require('./libs/leancloud-storage.js');
//const Realtime = require('./libs/leancloud-realtime.js').Realtime;
//const TypedMessagesPlugin = require('./libs/leancloud-realtime-plugin-typed-messages.js').TypedMessagesPlugin;
//const ImageMessage = require('./libs/leancloud-realtime-plugin-typed-messages.js').ImageMessage;

AV.init({
  appId: '',
  appKey: '',
});


App({
  data: {
    infor: '22'

  },
  onLaunch: function () {

    // 展示本地存储能力
   // var logs = wx.getStorageSync('logs') || []
   // logs.unshift(Date.now())
   // wx.setStorageSync('logs', logs)

    // 登录
    /*wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          console.log("fun")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("res" + res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log(777)
          wx.getUserInfo({
            success: res => {
              console.log("res" + res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
    var that = this
    //登陆
    //console.log(app.globalData.user)
    //console.log(app.user.attributes.avatarUrl)
    //console.log(1)
   

    AV.User.loginWithWeapp().then(user => {
      that.globalData.user = user.toJSON();
    }).catch(console.error);
  /*
    setTimeout(function () {

     // console.log(2)
      // 假设已经通过 AV.User.loginWithWeapp() 登录
      // 获得当前登录用户
      const user = AV.User.current();
      // 调用小程序 API，得到用户信息
      wx.getUserInfo({
        success: ({ userInfo }) => {
          // 更新当前用户的信息
          user.set(userInfo).save().then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            that.globalData.user = user.toJSON();
          }).catch(console.error);
        }
      });
      //console.log(app.globalData)

      //要延时执行的代码  
    }, 1000) //延迟时间 这里是1秒 

*/
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    user: null
  },

  setinf: function (setinf) {

    infor: setinf

  }
})