const AV = require('../../libs/av-weapp-min.js');
var app = getApp()
Page({
  data: {
    dates: '未选择',
    times: '未选择',
    objectArray: ['其他','系统修复', '网络修复', '电脑清灰','软件安装'],
    index: 0,
    maxdate:'2017-11-18',
    inf:null,
    na:null,
    ph:null,
    wxname:null,
    wxname2:null,
    openid:null
  },



  //输入框方法
  onLoad: function (options) {
    this.data.openid = app.globalData.user.authData.lc_weapp.openid
    this.data.wxname = app.globalData.user.nickName



    /*var _this = this;
    //console.log(this.data.serchname)
    var cql = 'select * from yuyue where wxname = ' + '"' + this.data.wxname + '"';
    console.log(cql)
    AV.Query.doCloudQuery(cql).then(function (data) {
      // results 即为查询结果，它是一个 AV.Object 数组
      var results = data.results;
      console.log(results)
      // console.log(results[0].attributes.name)
      _this.setData({
        wxname2: results[0].attributes.wxname,
      })
      console.log(2)
    }, function (error) {
    });
    this.setData({
      wxname:options.wxname
    })
    console.log(this.data.wxname)
*/

  },
/*
onShow:function(){
  var _this = this;
  //console.log(this.data.serchname)
  var cql = 'select * from yuyue where wxname = ' + '"' + this.data.wxname + '"';
  console.log(cql)
  AV.Query.doCloudQuery(cql).then(function (data) {
    // results 即为查询结果，它是一个 AV.Object 数组
    var results = data.results;
    console.log(results)
    // console.log(results[0].attributes.name)
    _this.setData({
      wxname2: results[0].attributes.wxname,
    })
    console.log(2)
  }, function (error) {
  });
},
*/

 

  //输入框方法
  inputna:function(e){
    console.log(e)
    this.setData({
      na:e.detail.value
    })

  },
  inputph: function (e) {
    console.log(e)
    this.setData({
      ph: e.detail.value
    })
  },

  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  //  点击类型组件确定事件  
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  up: function (na, ph){
    //console.log(na.detail.value)

    //从服务器上查询数据
    var _this = this;
    //console.log(this.data.serchname)
   /* var cql = 'select * from yuyue where wxname = ' + '"' + this.data.wxname + '"';
    console.log(cql)
    AV.Query.doCloudQuery(cql).then(function (data) {
      // results 即为查询结果，它是一个 AV.Object 数组
      var results = data.results;
      console.log(results)
      // console.log(results[0].attributes.name)
      _this.setData({
        wxname2: results[0].attributes.wxname,
      })
      console.log(2)
    }, function (error) {
    });*/
    //彩蛋
    if (this.data.na == "我爱你") {
    console.log(9999999999)
    wx.navigateTo({
      url: '../caidan/caidan'
    })
  }
   /* else if(this.data.wxname==this.data.wxname2){
      wx.showModal({
        title: '提示',
        content: '您最近有预约未完成，暂时无法预约哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }*/
 else if (this.data.dates == '未选择' || this.data.times == '未选择'){
      wx.showModal({
        title: '提示',
        content: '请务必选择维修日期和维修时间',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    
    else{
    


    /*this.setData(
      { inf: "name:" + this.data.na + '\n' + "phone:" + this.data.ph + '\n' + "date:" + this.data.dates + '\n' + "time:" + this.data.times + '\n' + "object:" + this.data.objectArray[this.data.index] })
    console.log(this.data.wxname)
*/
    wx.navigateTo({
      url: '../test/test?name=' + this.data.na + '&wxname=' + this.data.wxname + '&phone=' + this.data.ph + '&date=' + this.data.dates + '&time=' + this.data.times + '&object=' + this.data.objectArray[this.data.index] + '&openid='+this.data.openid
    })

    //返回到全局变量
    //app.setinf(this.data.inf)
    //console.log(app.data.infor)
    }
  }
})