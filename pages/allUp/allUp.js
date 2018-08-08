const app = getApp()
const AV = require('../../libs/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArrayQuesObject: ['未选择', '食堂伙食', '公寓设施', '超市经营', '公共浴室','教学学习','其它'],
    index2: 0,
    phone: null,
    zhuanye: null,
    detail: null,
    adress: null,
    QuesObject: "未选择",
    panding: null,
    openid:null,



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.openid = app.globalData.user.authData.lc_weapp.openid
    if (this.data.QuesObject == '其它（请务必在问题描述中填写）') {
      console.log(111)
    }

  },

  //输入框函数
  inputTelphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  inputZhuanye: function (e) {
    this.setData({
      zhuanye: e.detail.value
    })
    console.log(this.data.zhuanye)
  },
  inputAdress: function (e) {
    this.setData({
      adress: e.detail.value
    })
    console.log(this.data.adress)
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index2: e.detail.value,
      QuesObject: this.data.objectArrayQuesObject[e.detail.value]
    })
    if (e.detail.value == 6) {
      wx.showModal({
        title: '提示',
        content: '您选择了其他，请在问题详情中描述您遇到的问题',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (e.detail.value == 1 & this.data.adress == null) {
      wx.showModal({
        title: '提示',
        content: '您选择了食堂伙食，请在反馈地址中写下窗口位置，方便工作人员反馈',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (e.detail.value == 2 & this.data.adress == null) {
      wx.showModal({
        title: '提示',
        content: '您选择了公寓设施，请在反馈地址中写下具体位置，并在问题详情中描述遇到的问题，方便工作人员维修',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else if (e.detail.value == 3 & this.data.adress == null) {
      wx.showModal({
        title: '提示',
        content: '您选择了超市经营，请在问题详情中描述您遇到的困难或问题，方便工作人员反馈',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else if (e.detail.value == 4 & this.data.adress == null) {
      wx.showModal({
        title: '提示',
        content: '您选择了公共浴室，请在问题详情中描述您所遇到的困难或问题，方便工作人员反馈',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (e.detail.value == 5 & this.data.adress == null) {
      wx.showModal({
        title: '提示',
        content: '您选择了教学学习，请在问题详情中描述遇到的困难或问题，若涉及到教室或自习室，请在地址中填写位置，方便工作人员反馈',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  inputDetail: function (e) {
    this.setData({
      detail: e.detail.value
    })
    console.log(this.data.detail)
  },



  //提交内容
  updetail: function (e) {

    if (this.data.QuesObject == "未选择") {
      console.log(123)
      wx.showModal({
        title: '提示',
        content: '请您务必选择问题类型，若不清楚请选择其他',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    else if (this.data.adress == null && this.data.QuesObject != "其它（请务必在问题描述中填写）") {
      console.log(this.data.QuesObject)
      wx.showModal({
        title: '提示',
        content: '您在问题类型中选择的类型需要写清楚地址才行,如果无法描述，可以填写任意内容',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    else if (this.data.QuesObject == "其它（请务必在问题描述中填写）" && this.data.detail == null) {
      wx.showModal({
        title: '提示',
        content: '您在问题类型中选择了其他,请在问题详情中描述您遇到的问题',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    else if (this.data.phone == null) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '建议您填写联系方式，方便我们的工作人员联系您，更快地解决问题哦(若不想填写，点击取消即可）',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')

          } else if (res.cancel) {
            console.log('用户点击取消')
            //开始


            //提交到服务器
            console.log(1)
            var _this = this;
            var allQues = AV.Object.extend('allQues');
            // 新建一个 Todo 对象
            var Ques = new allQues();
            Ques.set('phone', that.data.phone);
           // Ques.set('zhuanye', that.data.zhuanye);
            Ques.set('adress', that.data.adress);
            Ques.set('leixing', that.data.QuesObject);
            Ques.set('xiangqing', that.data.detail);
            Ques.set('openid', app.globalData.user.authData.lc_weapp.openid);
            Ques.save().then(function (Ques) {
              wx.showModal({
                title: '提示',
                content: '您的意见已提交，感谢您的反馈和对我们的工作的支持，若您留下了联系方式，我们的工作人员可能会联系您，请您保持通话畅通',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '../index/index'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              // 成功保存之后，执行其他逻辑.
              console.log('New object created with objectId: ' + Ques.id);
            }, function (error) {
              // 异常处理
              console.error('Failed to create new object, with error message: ' + error.message);
            });
            //结束
          }
        }
      })
    }
    else {
      //开始


      //提交到服务器
      console.log(1)
      var _this = this;
      var allQues = AV.Object.extend('allQues');
      // 新建一个 Todo 对象
      var Ques = new allQues();
      Ques.set('phone', this.data.phone);
     // Ques.set('zhuanye', this.data.zhuanye);
      Ques.set('adress', this.data.adress);
      Ques.set('leixing', this.data.QuesObject);
      Ques.set('xiangqing', this.data.detail);
      Ques.set('openid', this.data.openid)
      Ques.save().then(function (Ques) {
        wx.showModal({
          title: '提示',
          content: '您的意见已提交，感谢您的反馈和对我们的工作的支持，若您留下了联系方式，我们的工作人员可能会联系您，请您保持通话畅通',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.redirectTo({
                url: '../index/index'
              })

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        // 成功保存之后，执行其他逻辑.
        console.log('New object created with objectId: ' + Ques.id);
      }, function (error) {
        // 异常处理
        console.error('Failed to create new object, with error message: ' + error.message);
      });

      //结束

    }
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