import User from './../../models/user.js';

Page({
  onLoad: function () {
    let token = wx.getStorageSync('token')
    if (token) {
      wx.switchTab({
        url: '/pages/todo/todo'
      })
    }
  },
  handleLogin: function () {
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code, 4444)
          User.login(res.code).then(res => {
            let token = res.token;
            wx.setStorageSync('token', token);
            console.log(token, 111)
            wx.switchTab({
              url: '/pages/todo/todo'
            })
          }).catch(e => console.log(e, 234))
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})