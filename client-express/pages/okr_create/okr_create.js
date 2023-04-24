import Okr from './../../models/okr.js';


Page({
  data: {
    objective: '',
    keyresults: [{
      title: ''
    }]
  },
  handleAddKeyresult: function () {
    let keyresults = this.data.keyresults;
    keyresults.push({
      title: ''
    })
    this.setData({
      keyresults
    })
  },
  handleDeleteKeyresult: function (e) {
    let index = e.currentTarget.dataset.index;
    let keyresults = this.data.keyresults;
    keyresults.splice(index, 1)
    this.setData({
      keyresults
    })
  },
  handleChangeKeyresult: function (e) {
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    let keyresults = this.data.keyresults;
    keyresults[index].title = value
    this.setData({
      keyresults
    })
  },
  handleChangeObjective: function (e) {
    let value = e.detail.value;
    this.setData({
      objective: value
    })
  },
  handleSubmit: function (e) {
    let objective = this.data.objective;
    let keyresults = this.data.keyresults;
    //每个input都得填
    for (let i = 0; i < keyresults.length; i++) {
      if (!objective || !keyresults[i].title) {
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
      objective,
      keyresults
    }
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