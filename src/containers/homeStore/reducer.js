//reducer.js

const defaultState = {
  name: 'sanyuan',
  list: [{
    id: 1,
    name: 'default-name-01',
  }, {
    id: 2,
    name: 'default-name-02',
  }],
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'change_list': 
    return {...state, list: action.list }

    default:
      return state;
  }
}
