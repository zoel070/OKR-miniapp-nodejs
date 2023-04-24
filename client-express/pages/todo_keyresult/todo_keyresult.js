import TodoKeyresult from '../../models/todoKeyresult.js';
import Keyresult from '../../models/keyresult.js';

Page({
  data: {
    optionId: 0,
    okr: [],
  },
  onLoad: function (o) {
    console.log(Number(o.id))
    this.setData({
      optionId: Number(o.id),
    })
    this.index()
  },
  index() {
    Keyresult.index().then(res => {
      console.log(res, 123)
      this.setData({
        okr: res,
      })
    })
  },
  relaChange: function (e) {
    let todo_id = this.data.optionId;
    let keyresult_id = e.currentTarget.dataset.keyresult_id;
    let active = e.currentTarget.dataset.active;
    let params = {
      todo_id,
      keyresult_id,
    }
    if (active == true) {
      TodoKeyresult.delete(params).then(res => {
        console.log(res, 222)
        this.index()
      })
    } else {
      TodoKeyresult.insert(params).then(res => {
        console.log(res, 333)
        this.index()
      })
    }
  }
})