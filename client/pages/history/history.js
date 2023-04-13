import Todo from './../../models/todo.js';

Page({
  data: {
    todos: []
  },
  onShow: function () {
    this.showTodo()
  },
  showTodo() {
    Todo.index({
      status: 1
    }).then(res => {
      this.setData({
        todos: res
      })
    })
  },
  handleShowActionSheet: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['标记为未完成', '删除'],
      itemColor: '#333',
      success: (res) => {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            this.handleChangeTodo(id)
            break;
          case 1:
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
  handleChangeTodo: function (id, index) {
    Todo.update(id, {
      status: 0,
    }).then(res => {
      this.showTodo()
    })
  },
  handleDeleteTodo: function (id, index) {
    Todo.delete(id).then(res => {
      this.showTodo()
    })
  }
})