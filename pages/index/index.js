const app = getApp()
const AV = require('../../libs/av-weapp-min.js');
var util = require('../../time/time.js');
var util = require('../../utils/util.js');
var curPageIndex = [1, 1]
var tabInitState = [false, false]
Page({
  data: {
    curSelClassifyIndex: 0,
    indeximg:[],
    imgUrls: [
      'http://lc-0B2nOcDK.cn-n1.lcfile.com/71ec86369190d4a79124.jpg',
      'http://lc-0b2nocdk.cn-n1.lcfile.com/03e34dce0ea98c001037.jpg'

    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxname: null,
    wxname2: null,
    wxname4: null,
    test: null,
    list: "综合反馈",
    listf: true,
    zhuangtai: "未登录（部分功能无法使用）",
    logos: [{
      image: "/image/tools.png",
      title: "电脑维修",
      bind: "yuTap"
    }, {
      image: "/image/upload.png",
      title: "综合反馈",
      bind: "allUp"
    }, {
      image: "/image/wireless.png",
      title: "网络报修",
      bind: "fixTap"
    },/* 
    {
      image: "/image/nba.png",
      title: "NBA",
      bind: "nba"
    }*/{
      image: "/image/puzzle.png",
      title: "问题排查",
      bind: "fixMyTap"
    },
   
    {
      image: "/image/user.png",
      title: "我的管理",
      bind: "tomy"
    },

    ],
    allques: {},
    allques1: {},
    Fankui: {},
    look: "收起",
    bindhidden: true,
    bindhidden2: false,
    ifsupport: [],
    suload: null,
    snload:null,
    //net
    sul:null,
    snl:null,
    support:[],
    dissupport:[],

    supnum: null,
    ifdissupport:[],
    netzan:false,
    color1:[],
    colornum:'',
    color2:[],
    coloenum2:'',
  },

  //跳转预约函数
  yuTap: function () {
    wx.navigateTo({
      url: '../yu/yu?wxname=' + this.data.userInfo.nickName
    })
   /// console.log("chick")
  },
  fixTap: function () {
    wx.navigateTo({
      url: '../net/net?wxname=' + this.data.userInfo.nickName
    })
  },
  nba:function(){
    wx.navigateTo({
      url: '../../api/apitest/apitest?wxname=' + this.data.userInfo.nickName
    })
  },

  onLoad: function () {
    var _this = this;
    //获取数据，判断是否要显示点赞功能（相当于吧功能调用放到云端了）
    var zan = new AV.Query('netif');
    zan.equalTo('name', 'netzan')
   // var zan=new AV.Query("netif");
    //query2.startsWith('data')
    zan.find().then(function (rec) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      rec.reverse()
      ///console.log(rec)
      _this.setData({
       netzan: rec[0].attributes.num
      })

    }, function (error) {
    });





    //综合反馈
    var image = new AV.Query('Indeximg');
    //query2.startsWith('data')
    image.find().then(function (rec) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      rec.reverse()
      //console.log(rec)

      for (var i = 0, len = rec.length; i < len; i++) {
        if (rec[i].attributes.view == true) {
          _this.data.indeximg.push(rec[i].attributes.url);
        }
      }
      _this.setData({
        indeximg: _this.data.indeximg
      })
//console.log(_this.data.indeximg)

    }, function (error) {
    });
    //综合反馈
    var query3 = new AV.Query('allQues');
    //query2.startsWith('data')
    query3.find().then(function (allQues) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      allQues.reverse()
      _this.setData({
        allques: allQues,
        colornum: allQues.length
      })
     // console.log(_this.data.colornum)

      var color = new Array([_this.data.colornum]);
      var i = 0;
      console.log(66666666)
      for (i = 0; i < _this.data.colornum; i++) {
        color.push('#eee')
        console.log(color[i])
       // console.log(_this.data.colornum)
      }
      for (i = 0; i < _this.data.colornum; i++) {
        if (i % 5 == 0) {
          color[i] = '#F8BBD0'
        } else if (i % 5 == 1) {
          color[i] = '#D1C4E9'
        } else if (i % 5 == 2) {
          color[i] = '#BBDEFB'
        } else if (i % 5 == 3) {
          color[i] = '#B2EbF2'
        } else if (i % 5 == 4) {
          color[i] = '#DCEDC8'
        }
        
      }
      _this.setData({
        color1:color
      })
    }, function (error) {
    });
   


    var query2 = new AV.Query('net');
    //query2.startsWith('data')
    query2.find().then(function (net) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      net.reverse()
      console.log(net)
      _this.setData({
        Fankui: net,
        colornum2: net.length
      })

      var colors = new Array([_this.data.colornum2]);
      var i = 0;
      console.log(66666666)
      for (i = 0; i < _this.data.colornum2; i++) {
        colors.push('#eee')
        console.log(colors[i])
        // console.log(_this.data.colornum)
      }
      for (i = 0; i < _this.data.colornum2; i++) {
        if (i % 5 == 1) {
          colors[i] = '#DCEDC8'
        } else if (i % 5 == 2) {
          colors[i] = '#B2EbF2'
        } else if (i % 5 == 3) {
          colors[i] = '#BBDEFB'
        } else if (i % 5 == 4) {
          colors[i] = '#D1C4E9'
        } else if (i % 5 == 0) {
          colors[i] = '#F8BBD0'
        }

      }
      _this.setData({
        color2: colors
      })

      //_this.Fankui[0].
      // console.log(_this.data.Yuyue[0].attributes.date)
    }, function (error) {
    });




    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  

    this.setData({
      time: time
    });
    //console.log(8989)
    console.log(app.globalData)


    var _this = this;
   /* wx.getStorage({
      key: 'wxid2',
      success: function (res) {

        console.log(res.data)
        _this.setData({
          test: res,
          zhuangtai: "已登录"
        })
      }
    })*/
    //状态


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
       // test: app.globalData.user.nickName
      })


    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,

        })
        console.log(this.data.userInfo)
        this.setData({
          wxname2: this.data.userInfo.nickName
        })
        wx.setStorageSync('wxid', this.data.wxname2)
      }



    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }

      })
    }


  },


  getUserInfo: function (e) {

    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      wxname2: this.data.userInfo.nickName
    })
    wx.setStorageSync('wxid2', this.data.userInfo.nickName)
    wx.setStorageSync('wxsrc2', this.data.userInfo.avatarUrl)

  },

  /*onHide: function () {
    var _this = this;
    wx.getStorage({
      key: 'wxid2',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          test: res,
          zhuangtai: "已登录"
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(1)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
  },
  onShow: function () {
    var _this = this;
    wx.getStorage({
      key: 'wxid2',
      success: function (res) {

        console.log(res.data)
        _this.setData({
          test: res,
          zhuangtai: "已登录"
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(1)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
  },*/
  onShareAppMessage: function () {
    return {
      title: '网络文化办公室',
      desc: '国关修电脑哪家强，教学楼二楼开水房',
    }
  },
  fixMyTap: function () {
    wx.navigateTo({
      url: '../fixmy/fixmy'
    })
  },
  tomy: function () {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  allUp: function () {
    var _this = this
    wx.showModal({
      title: '提示',
      content: '网络问题请在网络反馈中告诉我们哦',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../allUp/allUp?wxname=' + _this.data.userInfo.nickName
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  orderManage: function () {
    if (this.data.bindhidden == null) {
      this.setData({
        bindhidden: "true",
        look: "收起"
      })
    } else {
      this.setData({
        bindhidden: null,
        look: "查看"
      })
    }
  },
  onTitleBarsClick0: function () {
    this.setData({
      curSelClassifyIndex: 0,
      bindhidden2: false,
      bindhidden: true
    })
  },
  // 分类点击监听（iOS）
  onTitleBarsClick1: function () {
    this.setData({
      curSelClassifyIndex: 1,
      bindhidden: false,
      bindhidden2: true
    })
  },

  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value == false) {
      this.setData({
        list: "校园网络",
        bindhidden2: true,
        bindhidden: false
      })

    } else {
      this.setData({
        list: "综合反馈",
        bindhidden2: false,
        bindhidden: true
      })
    }
  },

  //点赞
  onUpTop: function (e) {
    var that = this
    //console.log(e)
    var $data = e.currentTarget.dataset.id;

    //console.log($data)
    //获得当前id
    this.setData({
      suload: this.data.allques[$data].id
    })

    console.log(this.data.suload)

    wx.getStorage({
      key: that.data.suload,//如果有该缓存，则证明已经点赞，设置判断为true
      success: function (res) {
        console.log("have")
        //console.log(res.data)
        
        that.data.ifsupport[$data] = false
        that.setData({
          ifsupport:that.data.ifsupport
        })
        that.concelup(that.data.suload, $data)
        wx.showToast({
          title:  "其实是手滑了",
          duration: 1000,
          icon: "sucess",
          make: true
        })
        
      },//如果没有该缓存，则判断没有点赞，新建缓存，并设置判断为false
      fail: function () {
        console.log(123)
        wx.setStorage({
          key: that.data.suload,
          data: true
        })
        
        that.data.ifsupport[$data]= true
        that.setData({
          ifsupport:that.data.ifsupport
        })
        console.log(that.data.ifsupport[$data])
        that.up(that.data.suload, $data)
        wx.showToast({
          title:"说得对！",
          duration: 1000,
          icon: "sucess",
          make: true
        })
      }
    })

  },

  //点赞函数
  up(id, viewid) {
    var that = this
    var query = new AV.Query('allQues');
    query.get(id).then(function (support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.supports = support.attributes.supports + 1
      that.data.allques[viewid].attributes.supports = support.attributes.supports
      that.setData({
        allques: that.data.allques
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('allQues', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('supports', that.data.allques[viewid].attributes.supports);
      // 保存到云端
      suc.save();

    }, function (error) {
      // 异常处理
    });


  },
  //取消点赞
  concelup(id, viewid) {
    wx.removeStorage({
      key: id,
      success: function (res) {
        console.log(res.data)
      }
    })
    var that = this
    var query = new AV.Query('allQues');
    query.get(id).then(function (support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.supports = support.attributes.supports - 1
      that.data.allques[viewid].attributes.supports = support.attributes.supports
      that.setData({
        allques: that.data.allques
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('allQues', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('supports', that.data.allques[viewid].attributes.supports);
      // 保存到云端
      suc.save();

    }, function (error) {
      // 异常处理
    });

  },


//踩一下
  onnptop: function (e) {
    var that = this
    //console.log(e)
    var $data = e.currentTarget.dataset.id;

    //console.log($data)
    //获得当前id
    this.setData({
      snload: this.data.allques[$data].id
    })

   // console.log(this.data.snload)

    wx.getStorage({
      key: that.data.snload+'dis',//如果有该缓存，则证明已经点赞，设置判断为true
      success: function (res) {
        console.log("dishave")
        //console.log(res.data)

        that.data.ifdissupport[$data] = false
        that.setData({
          ifdissupport: that.data.ifdissupport
        })
        that.concelnp(that.data.snload, $data)
        wx.showToast({
          title: "其实是手滑了",
          duration: 1000,
          icon: "sucess",
          make: true
        })

      },//如果没有该缓存，则判断没有点赞，新建缓存，并设置判断为false
      fail: function () {
        console.log(123)
        wx.setStorage({
          key: that.data.snload+'dis',
          data: true
        })

        that.data.ifdissupport[$data] = true
        that.setData({
          ifdissupport: that.data.ifdissupport
        })
       // console.log(that.data.ifdissupport[$data])
        that.np(that.data.snload, $data)
        wx.showToast({
          title: "我觉得不行",
          duration: 1000,
          icon: "sucess",
          make: true
        })
      }
    })

  },
  np(id, viewid) {
    var that = this
    var query = new AV.Query('allQues');
    query.get(id).then(function (support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.dislike = support.attributes.dislike + 1
      that.data.allques[viewid].attributes.dislike = support.attributes.dislike
      that.setData({
        allques: that.data.allques
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('allQues', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('dislike', that.data.allques[viewid].attributes.dislike);
      // 保存到云端
      suc.save();

    }, function (error) {
      // 异常处理
    });


  },
  //取消点赞
  concelnp(id, viewid) {
    wx.removeStorage({
      key: id+'dis',
      success: function (res) {
        console.log(res.data)
      }
    })
    var that = this
    var query = new AV.Query('allQues');
    query.get(id).then(function (support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.dislike = support.attributes.dislike - 1
      that.data.allques[viewid].attributes.dislike = support.attributes.dislike
      that.setData({
        allques: that.data.allques
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('allQues', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('dislike', that.data.allques[viewid].attributes.dislike);
      // 保存到云端
      suc.save();

    }, function (error) {
      // 异常处理
    });

  },

//网络点赞
  //点赞
  UpTop: function (e) {
    var that = this
    console.log(e)
    var $data = e.currentTarget.dataset.id;

    console.log($data)
    //获得当前id
    this.setData({
      sul: this.data.Fankui[$data].id
    })

    console.log(this.data.sul)

    wx.getStorage({
      key: that.data.sul+'net',//如果有该缓存，则证明已经点赞，设置判断为true
      success: function (res) {
        console.log("have")
        //console.log(res.data)

        that.data.support[$data] = false
        that.setData({
          support: that.data.support
        })
        that.concelup2(that.data.sul, $data)
        wx.showToast({
          title: "其实是手滑了",
          duration: 1000,
          icon: "sucess",
          make: true
        })

      },//如果没有该缓存，则判断没有点赞，新建缓存，并设置判断为false
      fail: function () {
        console.log(123)
        wx.setStorage({
          key: that.data.sul+'net',
          data: true
        })

        that.data.support[$data] = true
        that.setData({
          support: that.data.support
        })
        console.log(that.data.support[$data])
        that.up2(that.data.sul, $data)
        wx.showToast({
          title: "说得对！",
          duration: 1000,
          icon: "sucess",
          make: true
        })
      }
    })

  },

  //点赞函数
  up2(id, viewid) {
    var that = this
    var query = new AV.Query('net');
    query.get(id).then(function (support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.sup = support.attributes.sup + 1
      that.data.Fankui[viewid].attributes.sup = support.attributes.sup
      that.setData({
        Fankui: that.data.Fankui
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('net', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('sup', that.data.Fankui[viewid].attributes.sup);
      // 保存到云端
      suc.save();

    }, function (error) {
      // 异常处理
    });


  },
  //取消点赞
  concelup2(id, viewid) {
    wx.removeStorage({
      key: id+'net',
      success: function (res) {
        console.log(res.data)
      }
    })
    var that = this
    var query = new AV.Query('net');
    query.get(id).then(function (support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.sup = support.attributes.sup - 1
      that.data.Fankui[viewid].attributes.sup = support.attributes.sup
      that.setData({
        Fankui: that.data.Fankui
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('net', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('sup', that.data.Fankui[viewid].attributes.sup);
      // 保存到云端
      suc.save();

    }, function (error) {
      // 异常处理
    });

  },


  //踩一下
  nptop: function (e) {
    var that = this
    //console.log(e)
    var $data = e.currentTarget.dataset.id;

    //console.log($data)
    //获得当前id
    this.setData({
      snl: this.data.Fankui[$data].id
    })

    // console.log(this.data.snload)

    wx.getStorage({
      key: that.data.snl + 'disnet',//如果有该缓存，则证明已经点赞，设置判断为true
      success: function (res) {
        console.log("dishave")
        //console.log(res.data)

        that.data.dissupport[$data] = false
        that.setData({
          dissupport: that.data.dissupport
        })
        that.concelnp2(that.data.snl, $data)
        wx.showToast({
          title: "其实是手滑了",
          duration: 1000,
          icon: "sucess",
          make: true
        })

      },//如果没有该缓存，则判断没有点赞，新建缓存，并设置判断为false
      fail: function () {
        console.log(123)
        wx.setStorage({
          key: that.data.snl + 'disnet',
          data: true
        })

        that.data.dissupport[$data] = true
        that.setData({
          dissupport: that.data.dissupport
        })
        // console.log(that.data.ifdissupport[$data])
        that.np2(that.data.snl, $data)
        wx.showToast({
          title: "我觉得不行",
          duration: 1000,
          icon: "sucess",
          make: true
        })
      }
    })

  },
  np2(id, viewid) {
    var that = this
    var query = new AV.Query('net');
    query.get(id).then(function (support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.diske = support.attributes.diske + 1
      that.data.Fankui[viewid].attributes.diske = support.attributes.diske
      that.setData({
        Fankui: that.data.Fankui
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('net', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('diske', that.data.Fankui[viewid].attributes.diske);
      // 保存到云端
      suc.save();

    }, function (error) {
      // 异常处理
    });


  },
  //取消点赞
  concelnp2(id, viewid) {
    wx.removeStorage({
      key: id + 'disnet',
      success: function (res) {
        console.log(res.data)
      }
    })
    var that = this
    var query = new AV.Query('net');
    query.get(id).then(function (support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.diske = support.attributes.diske - 1
      that.data.Fankui[viewid].attributes.diske = support.attributes.diske
      that.setData({
        Fankui: that.data.Fankui
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('net', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('diske', that.data.Fankui[viewid].attributes.diske);
      // 保存到云端
      suc.save();

    }, function (error) {
      // 异常处理
    });

  },


})