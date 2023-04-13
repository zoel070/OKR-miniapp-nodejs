import { request } from './request.js';
import API from './api.js';

export default {
  login (code) {
    return request({ url: API.login, method: 'POST', data: { code } })
  },
}