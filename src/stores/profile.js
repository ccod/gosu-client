import { asyncActions } from './util'
import Client from 'utils/client'

const [profileR, profileS, profileE] = asyncActions('player')

const fetchProfile = dispatch => () => {
    let http = new Client()
    dispatch(profileR.act())
    return http.getProfile()
        .then(({data}) => dispatch(profileS.act(data)))
        .catch(({data}) => dispatch(profileE.act(data)))
}

const defaultState = {loading: false, value: null, error: null}
const reducer = (state = defaultState, { type, payload }) => {
    switch(type) {
        case profileR.type:
            return Object.assign({}, state, {loading: true, error: null})
        case profileS.type:
            console.log('State: ', state)
            return Object.assign({}, state, {loading: false, value: payload, error: null})
        case profileE.type:
            return Object.assign({}, state, {loading: false, value: payload, error: true})
        default: return state 
    }
}

export { fetchProfile, reducer }