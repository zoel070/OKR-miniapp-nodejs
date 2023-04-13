import {
  request
} from './request.js';
import API from './api.js';

export default {
  index() {
    return request({
      url: API.okr,
    })
  },
  insert(params) {
    return request({
      url: API.okr,
      method: 'POST',
      data: params
    })
  },
  delete(id) {
    return request({
      url: API.okrItem(id),
      method: 'DELETE',
    })
  },
  update(id, params) {
    return request({
      url: API.okrItem(id),
      method: 'PUT',
      data: params
    })
  },
}