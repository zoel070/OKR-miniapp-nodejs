import {
  request
} from './request.js';
import API from './api.js';

export default {
  index() {
    return request({
      url: API.keyresult,
      method: 'GET',
    })
  },
  show(id) {
    return request({
      url: API.keyresultItem(id),
      method: 'GET',
    })
  },
  update(id, params) {
    return request({
      url: API.keyresultItem(id),
      method: 'PUT',
      data: params,
    })
  },
  delete(id) {
    return request({
      url: API.keyresultItem(id),
      method: 'DELETE',
    })
  },
  insert(params) {
    return request({
      url: API.keyresult,
      method: 'POST',
      data: params
    })
  },
}