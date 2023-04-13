import Okr from './../../models/okr.js';
import Keyresult from './../../models/keyresult.js';

Page({
  data: {
    optionId: 0,
    objective: '',
    keyresults: [],
    rawIds: [],
  },

  onLoad: function (o) {
    this.setData({
      optionId: o.id,
    })
    Keyresult.show(this.data.optionId).then(res => {
      console.log(res, 444)
      let objective = res.title;
      let keyresults = res.keyresults;
      let rawIds = keyresults.map(data => data.id)
      console.log(rawIds)
      this.setData({
        objective,
        keyresults,
        rawIds
      })
    })
  },
  
  handleAddKeyresult: function () {
    let keyresults = this.data.keyresults;
    keyresults.push({
      id: 0,
      title: '',
      objective_id: this.data.optionId,
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
    let title = this.data.objective;
    let keyresults = this.data.keyresults;
    let objective_id = this.data.optionId;
    //每个input都得填
    let tmp = keyresults.every(data => data.title);
    if (!title || !tmp) {
      wx.showToast({
        title: '目标和成果为必填项目',
        icon: 'none',
        mask: true,
        duration: 1000
      })
      return
    }
    Okr.update(objective_id, {
      title
    }).then(res => {
      wx.showToast({
        title: '成功',
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
    let rawIds = this.data.rawIds;
    let newIds = keyresults.map(data => data.id);
    let tmpIds = [];
    //处理原todos
    for (let i = 0; i < rawIds.length; i++) {
      let num = newIds.indexOf(rawIds[i])
      if (num != -1) {
        tmpIds.push(num);
        let title = keyresults[num].title;
        Keyresult.update(rawIds[i], {
          title
        }).then(res => console.log(res))
      } else {
        Keyresult.delete(rawIds[i]).then(res => console.log(res))
      }
    }
    //处理新todos
    for (let i = 0; i < keyresults.length; i++) {
      if (keyresults[i].id == 0) {
        let objective_id = keyresults[i].objective_id;
        let title = keyresults[i].title;
        Keyresult.insert({
          objective_id,
          title
        }).then(res => {
          console.log(res)
        })
      }
    }
  }




})