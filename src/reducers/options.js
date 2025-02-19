// @flow

import { fromJS } from 'immutable'

import * as C from '_/constants'
import { actionReducer } from './utils'
import { locale } from '_/intl'
import AppConfiguration from '_/config'
import type { UserOptionsType } from '_/ovirtapi/types'
import type { LoadUserOptionsActionType } from '_/actions/types'

const defaultOptions: UserOptionsType = {
  localOptions: {
    showNotifications: true,
    notificationSnoozeDuration: AppConfiguration.notificationSnoozeDurationInMinutes,
  },
  remoteOptions: {
    autoconnect: {
      id: undefined,
      content: '',
    },
    locale: {
      id: undefined,
      content: locale,
    },
    persistLocale: {
      id: undefined,
      content: AppConfiguration.persistLocale,
    },
    refreshInterval: {
      id: undefined,
      content: AppConfiguration.schedulerFixedDelayInSeconds,
    },
    fullScreenVnc: {
      id: undefined,
      content: false,
    },
    fullScreenNoVnc: {
      id: undefined,
      content: false,
    },
    ctrlAltEndVnc: {
      id: undefined,
      content: false,
    },
    fullScreenSpice: {
      id: undefined,
      content: false,
    },
    ctrlAltEndSpice: {
      id: undefined,
      content: false,
    },
    smartcardSpice: {
      id: undefined,
      content: AppConfiguration.smartcardSpice,
    },
  },
  ssh: undefined,
  lastTransactions: {},
  consoleOptions: {},
}

const initialState: any = fromJS({ ...defaultOptions })

const options: any = actionReducer(initialState, {
  [C.SET_CONSOLE_OPTIONS] (clientState: any, { payload: { vmId, options } }: any): any {
    return clientState.setIn(['consoleOptions', vmId], options)
  },
  [C.LOAD_USER_OPTIONS]: (clientState: any, action: LoadUserOptionsActionType) => {
    const serverState = fromJS(action.payload.userOptions || {})

    const mergedRemote = clientState.get('remoteOptions').mergeWith((client, server, key) => {
      return server === undefined ? client : server
    }, serverState)

    return clientState.setIn(['remoteOptions'], mergedRemote)
  },
  [C.SET_OPTION] (state: any, { payload: { key, value } }: any): any {
    return state.setIn(key, fromJS(value))
  },
  [C.SET_SSH_KEY] (state: any, { payload: { key, id } }: any): any {
    return state.setIn(['ssh'], fromJS({ key: key || '', id }))
  },
  [C.DELETE_USER_OPTION] (state: any, { payload: { optionId } }: any): any {
    // applies only to remote options (local have no optionId)
    const [name] = state.get('remoteOptions')
      .findEntry((value, key) => value && value.get?.('id') === optionId) || []

    if (!name) {
      return state
    }

    // overwrite with default state
    return state.setIn(['remoteOptions', name], fromJS(defaultOptions.remoteOptions[name]))
  },
})

export default options
export {
  initialState,
}
