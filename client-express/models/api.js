const PREFIX = 'http://localhost:7001/api';
export default {
  login: PREFIX + '/login',
  todo: PREFIX + '/todo',
  todoItem: (id) => `${PREFIX}/todo/${id}`,
  okr: PREFIX + '/okr',
  okrItem: (id) => `${PREFIX}/okr/${id}`,
  keyresult: PREFIX + '/keyresult',
  keyresultItem: (id) => `${PREFIX}/keyresult/${id}`,
  todoKeyresult: PREFIX + '/todoKeyresult',
}