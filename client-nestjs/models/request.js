export const request = (params) => {
  let token = wx.getStorageSync('token')  //每次发起请求都会提交token
  if (token) {
    params.headers = params.headers ? params.headers : {}
    params.headers['authorization'] = token
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      header: params.headers,
      method: params.method || 'GET',
      data: params.data || {},
      success: (res) => {
        if (res.statusCode == 200) {
          resolve(res.data.data)
        } else {
          wx.showModal({
            title: '注意',
            content: res.data.message,
            confirmText: "确定",
            showCancel: false,
          })
          reject()
        }
      },
      fail: (err) => {
        wx.showModal({
          title: '服务端出现故障',
          content: err.errMsg,
          confirmText: "确定",
          showCancel: false,
        })
        reject()
      }
    })
  })
}