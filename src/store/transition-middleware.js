import { push } from 'react-router-redux'
import { makeGetLink } from '../containers/ui/NavLink/selector'

export const middleware = store => next => action => {
  const result = next(action)

  if (action && action.meta && action.meta.transition) {
    /**
     * @namespace
     *
     * {String} to - url path or routeName
     * {Object} [params={}] - not required custom route params for example {userId:5} users/list/:userId - replaced to users/list/5
     */
    const transition = action.meta.transition

    if (transition.to) {
      const state = store.getState()
      const selector = makeGetLink()
      const params = transition.params
      const path = selector(state, {
        to: transition.to,
        params
      })

      store.dispatch(push(path))
      return result
    }
  }

  return result
}
