import { request } from './request.js';
import API from './api.js';

export default {
  insert (params) {
    return request({ url: API.todo, method: 'POST', data: params })
  },
  index (params) {
    return request({ url: API.todo , data: params})
  },
  update (id, params) {
    return request({ url: API.todoItem(id), method: 'PUT', data: params})
  },
  delete (id) {
    return request({ url: API.todoItem(id), method: 'DELETE'})
  },
}