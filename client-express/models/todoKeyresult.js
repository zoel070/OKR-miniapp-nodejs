import { request } from './request.js';
import API from './api.js';

export default {
  insert (params) {
    return request({ url: API.todoKeyresult, method: 'POST', data: params })
  },
  delete (params) {
    return request({ url: API.todoKeyresult, method: 'DELETE', data: params})
  },
}