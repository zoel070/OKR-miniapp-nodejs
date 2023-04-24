import Okr from './../../models/okr.js';


Page({
  data: {
    objective: '',
    keyresult: [{
      title: ''
    }]
  },
  handleAddKeyresult: function () {
    let keyresult = this.data.keyresult;
    keyresult.push({
      title: ''
    })
    this.setData({
      keyresult
    })
  },
  handleDeleteKeyresult: function (e) {
    let index = e.currentTarget.dataset.index;
    let keyresult = this.data.keyresult;
    keyresult.splice(index, 1)
    this.setData({
      keyresult
    })
  },
  handleChangeKeyresult: function (e) {
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    let keyresult = this.data.keyresult;
    keyresult[index].title = value
    this.setData({
      keyresult
    })
  },
  handleChangeObjective: function (e) {
    let value = e.detail.value;
    this.setData({
      objective: value
    })
  },
  handleSubmit: function (e) {
    let title = this.data.objective;
    let keyresult = this.data.keyresult;
    //每个input都得填
    for (let i = 0; i < keyresult.length; i++) {
      if (!title || !keyresult[i].title) {
        wx.showToast({
          title: '目标和成果为必填项目',
          icon: 'none',
          mask: true,
          duration: 1000
        })
        return
      }
    }
    //发起请求
    let data = {
      title,
      keyresult
    }
    console.log(data, 123)
    Okr.insert(data).then((res) => {
      console.log(res, 123)
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    })
  }
})