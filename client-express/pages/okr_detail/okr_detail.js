import Okr from './../../models/okr.js';
import Keyresult from './../../models/keyresult.js';

Page({
  data: {
    optionId: 0,
    okr: {}
  },
  onLoad: function (o) {
    this.setData({
      optionId: o.id,
    })
    this.okrShow();
  },
  okrShow() {
    Keyresult.show(this.data.optionId).then(res => {
      console.log(res, 1233)
      this.setData({
        okr: res,
      })
    })
  },
  handleKeyresultActionSheet: function (event) {
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    let statusChange = status ? 0 : 1;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';
    wx.showActionSheet({
      itemList: [statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: (res) => {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            Keyresult.update(id, {
              status: statusChange
            }).then(res => {
              console.log(res, 222)
              this.okrShow()
            })
            break;
          case 1:
            Keyresult.delete(id).then(res => {
              console.log(res, 33)
              this.okrShow()
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleObjectiveActionSheet: function (event) {
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    let statusChange = status ? 0 : 1;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';
    wx.showActionSheet({
      itemList: [statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: (res) => {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            Okr.update(id, {
              status: statusChange
            }).then(res => {
              this.okrShow()
            })
            break;
          case 1:
            Okr.delete(id).then(res => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000,
                mask: true
              })
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/okr/okr'
                })
              }, 1000)
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
})