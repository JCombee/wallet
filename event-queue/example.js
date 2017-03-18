import EventQueue from './'

const ADDED_TRANSACTION = 'ADDED_TRANSACTION'
const ADD_TRANSACTION = 'ADD_TRANSACTION'

const queue = new EventQueue()

const transactions = []

queue.addReducer(ADD_TRANSACTION, (payload) => {
  transactions.append(payload)
  queue.dispatch({
    type: ADDED_TRANSACTION,
    payload
  })
})

queue.addReducer(ADDED_TRANSACTION, (payload) => {
  console.log('its added')
})

queue.dispatch({
  type: ADD_TRANSACTION,
  payload: { foo: 'bar' }
})

while (true) {}
