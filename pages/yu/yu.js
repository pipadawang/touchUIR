const AV = require('../../libs/leancloud-storage.js');
import Dialog from '../../dist/dialog/dialog';
var app = getApp();
import Toast from '../../dist/toast/toast';
Page({


  data: {

    dates: '未选择',
    times: '未选择',
    objectArray: ['其他', '系统修复', '网络修复', '电脑清灰', '软件安装'],
    index: 0,
    maxdate: '2017-11-18',
    inf: null,
    na: '',
    ph: null,
    wxname: null,
    wxname2: null,
    openid: null,
    actions: null,
    show: false,
    leixing:"请选择维修类型"
  },
  onClickIcon() {
    Toast('建议输入真实姓名哦~');
  },
  toggle(type) {
    this.setData({
      [type]: !this.data[type]
    });
  },
  chhoose_leixing: function() {
    this.toggle("show")
    
  },
  chhoose_leixing_select:function(e){
    this.toggle("show")
   
    console.log(e.detail.name)
    this.setData({
      leixing: e.detail.name
    })
  },
  //输入框方法
  onLoad: function(options) {
    this.setData({
      actions: [
        { name: '系统修复' },
        { name: '网络修复'},
        { name: '电脑清灰' },
        { name: '软件安装' },
        { name: '其他' },
        
      ]
    });
    this.data.openid = app.globalData.user.authData.lc_weapp.openid
    this.data.wxname = app.globalData.user.nickName



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
  inputna: function(e) {
    console.log(e)
    this.setData({
      na: e.detail
    })

  },
  inputph: function(e) {
    console.log(e)
    this.setData({
      ph: e.detail
    })
  },

  //  点击时间组件确定事件  
  bindTimeChange: function(e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  //  点击类型组件确定事件  
  bindPickerChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  up: function(na, ph) {
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
    else if (this.data.dates == '未选择' || this.data.times == '未选择' || this.data.leixing =='请选择维修类型') {
      wx.showModal({
        title: '提示',
        content: '请务必填写详细信息',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      Toast('信息已提交');

      // 提交数据到服务器
      var yuyue = AV.Object.extend('yuyue');
      // 新建一个 Todo 对象
      var todo = new yuyue();
      todo.set('wxname', this.data.wxname);
      todo.set('name', this.data.na);
      todo.set('phone', this.data.ph);
      todo.set('date', this.data.dates);
      todo.set('time', this.data.times);
      todo.set('object', this.data.leixing);
      todo.set('zhuangtai', '已接受预约');
      todo.set('openid', this.data.openid)
      todo.save().then(function (todo) {
        // 成功保存之后，执行其他逻辑.
        console.log('New object created with objectId: ' + todo.id);
        
        wx.navigateBack({
          delta: 1
        });
      }, function (error) {
        // 异常处理
        console.error('Failed to create new object, with error message: ' + error.message);
      });

      //微信name
      /*this.setData(
      { inf: "name:" + this.data.na + '\n' + "phone:" + this.data.ph + '\n' + "date:" + this.data.dates + '\n' + "time:" + this.data.times + '\n' + "object:" + this.data.objectArray[this.data.index] })
    console.log(this.data.wxname)
*/
      
      /*wx.navigateTo({
        url: '../index/index?name=' + this.data.na + '&wxname=' + this.data.wxname + '&phone=' + this.data.ph + '&date=' + this.data.dates + '&time=' + this.data.times + '&object=' + this.data.leixing + '&openid=' + this.data.openid
      })*/

      //返回到全局变量
      //app.setinf(this.data.inf)
      //console.log(app.data.infor)
    }
  },
 
    back() {
      wx.showModal({
        title: '确认',
        content: '你确定不要填写吗？若果您担心信息泄露，可在每晚八点钟前往教学楼二楼水房维修',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
              delta: 1
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },
})