const PREFIX = 'http://localhost:3000/api';
export default {
  login: PREFIX + '/login',
  todo: PREFIX + '/todo',
  todoItem: (id) => `${PREFIX}/todo/${id}`,
  okr: PREFIX + '/okr',
  okrItem: (id) => `${PREFIX}/okr/${id}`,
  okrEdit: PREFIX + '/okr/edit',
  keyresult: PREFIX + '/keyresult',
  keyresultItem: (id) => `${PREFIX}/keyresult/${id}`,
  todoKeyresult: PREFIX + '/todoKeyresult',
}