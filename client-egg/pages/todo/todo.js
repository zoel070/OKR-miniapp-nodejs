import Todo from './../../models/todo.js';

Page({
  data: {
    todos: [],
    value: '',
  },
  onShow: function () {
    this.showTodo();
  },
  showTodo() {
    Todo.index({
      status: 0
    }).then(res => {
      this.setData({
        todos: res
      })
    })
  },
  handleInput: function (event) {
    let value = event.detail.value;
    this.setData({
      value
    })
  },
  handleConfirm: function (event) {
    let title = event.detail.value;
    Todo.insert({
      title
    }).then(res => {
      this.showTodo();
      this.setData({
        value: '',
      })
    })
  },
  handleShowActionSheet: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['关联', '完成', '删除'],
      itemColor: '#333',
      success: (res) => {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            wx.navigateTo({
              url: '/pages/todo_keyresult/todo_keyresult?id=' + id
            })
            break;
          case 1:
            this.handleFinishTodo(id)
            break;
          case 2:
            wx.showModal({
              title: '删除',
              content: '是否确定要删除该 Todo',
              success: (res) => {
                if (res.confirm) {
                  this.handleDeleteTodo(id)
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
  handleFinishTodo: function (id) {
    Todo.update(id, {
      status: 1
    }).then(res => {
      this.showTodo()
    })
  },
  handleDeleteTodo: function (id) {
    Todo.delete(id).then(res => {
      this.showTodo()
    })
  }
})