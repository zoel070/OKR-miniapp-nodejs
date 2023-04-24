import Okr from './../../models/okr.js';

Page({
  data: {
    objectives: []
  },
  onShow: function () {
    this.showOb();
  },
  showOb() {
    Okr.index().then(res => {
      this.setData({
        objectives: res
      })
    })
  },
  handleObjectiveActionSheet: function (event) {
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    let statusChange = status ? 0 : 1;
    let statusChangeDisplay = statusChange ? '已完成' : '未完成';
    wx.showActionSheet({
      alertText: '123',
      itemList: ['查看', '编辑', statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: (res) => {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            wx.navigateTo({
              url: '/pages/okr_detail/okr_detail?id=' + id
            })
            break;
          case 1:
            wx.navigateTo({
              url: '/pages/okr_edit/okr_edit?id=' + id
            })
            break;
          case 2:
            this.handleChangeObjective(id, statusChange)
            break;
          case 3:
            wx.showModal({
              title: '删除',
              content: '是否确定要删除该 OKR',
              success: (res) => {
                if (res.confirm) {
                  this.handleDeleteObjective(id)
                }
              }
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleChangeObjective: function (id, status) {
    Okr.update(id, {
      status
    }).then(res => {
      this.showOb()
    })
  },
  handleDeleteObjective: function (id) {
    Okr.delete(id).then(res => {
      this.showOb()
    })
  }
})