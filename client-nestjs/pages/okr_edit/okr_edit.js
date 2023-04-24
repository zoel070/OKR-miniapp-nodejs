import Okr from './../../models/okr.js';
import Keyresult from './../../models/keyresult.js';

Page({
  data: {
    optionId: 0,
    objective: '',
    keyresult: [],
    rawIds: [],
  },

  onLoad: function (o) {
    this.setData({
      optionId: o.id,
    })
    Okr.show(this.data.optionId).then(res => {
      console.log(res, 444)
      let objective = res.title;
      let keyresult = res.keyresult;
      let rawIds = keyresult.map(data => data.id)
      console.log(rawIds)
      this.setData({
        objective,
        keyresult,
        rawIds
      })
    })
  },

  handleAddKeyresult: function () {
    let keyresult = this.data.keyresult;
    keyresult.push({
      id: 0,
      title: '',
      okr: this.data.optionId,
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
    let objective_id = this.data.optionId;
    let rawIds = this.data.rawIds;
    //每个input都得填
    let tmp = keyresult.every(data => data.title);
    if (!title || !tmp) {
      wx.showToast({
        title: '目标和成果为必填项目',
        icon: 'none',
        duration: 1000
      })
      return
    }
    let tmpKrs = [];
    const rawMap = new Map(rawIds.map((k, i) => [k, k]));
    keyresult.forEach((t) => {
      if (rawMap.has(t.id)) {
        tmpKrs.push(t.id)
      }
    })
    let dropKrs = [];
    const tmpMap = new Map(tmpKrs.map((k, i) => [k, k]));
    rawIds.forEach((t) => {
      if (!tmpMap.has(t)) {
        dropKrs.push(t)
      }
    })
    let newOkr = {
      title,
      keyresult,
      id: objective_id,
    }
    let params = {
      dropKrs,
      newOkr,
    }
    console.log(params);
    Okr.edit(params).then(res => {
      console.log(res, 1122)
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000,
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/okr/okr'
        })
      }, 1000)
    })
  }
})