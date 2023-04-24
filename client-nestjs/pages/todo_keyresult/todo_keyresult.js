import TodoKeyresult from '../../models/todoKeyresult.js';
import Okr from '../../models/okr.js';
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
    Okr.index().then(res => {
      console.log(res, 123)
      this.setData({
        okr: res,
      })
    })
  },
  relaChange: function (e) {
    let todoId = this.data.optionId;
    let krId = e.currentTarget.dataset.keyresult_id;
    let active = e.currentTarget.dataset.active;
    let params = {
      todoId,
      krId,
    }
    if (active == true) {
      Keyresult.deleteTodo(params).then(res => {
        this.index()
      })
    } else {
      Keyresult.addTodo(params).then(res => {
        this.index()
      })
    }
  }
})