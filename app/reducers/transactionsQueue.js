import { TRANSACTIONS_QUEUE_ACTIONS } from './../constants/transactions'

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case TRANSACTIONS_QUEUE_ACTIONS.RECEIVE :
      return action.payload
    default :
      return state
  }
}
