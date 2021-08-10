// Keep alphabetically sorted

export const ACTION_IN_PROGRESS_START = 'ACTION_IN_PROGRESS_START'
export const ACTION_IN_PROGRESS_STOP = 'ACTION_IN_PROGRESS_STOP'
export const ADD_ACTIVE_REQUEST = 'ADD_ACTIVE_REQUEST'
export const ADD_DISK_REMOVAL_PENDING_TASK = 'ADD_DISK_REMOVAL_PENDING_TASK'
export const ADD_NETWORKS_TO_VNIC_PROFILES = 'ADD_NETWORKS_TO_VNIC_PROFILES'
export const ADD_SNAPSHOT_ADD_PENDING_TASK = 'ADD_SNAPSHOT_ADD_PENDING_TASK'
export const ADD_SNAPSHOT_REMOVAL_PENDING_TASK = 'ADD_SNAPSHOT_REMOVAL_PENDING_TASK'
export const ADD_SNAPSHOT_RESTORE_PENDING_TASK = 'ADD_SNAPSHOT_RESTORE_PENDING_TASK'
export const ADD_VM_NIC = 'ADD_VM_NIC'
export const ADD_USER_MESSAGE = 'ADD_USER_MESSAGE'
export const APP_CONFIGURED = 'APP_CONFIGURED'
export const AUTO_ACKNOWLEDGE = 'AUTO_ACKNOWLEDGE'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_VM_CDROM = 'CHANGE_VM_CDROM'
export const CHECK_CONSOLE_IN_USE = 'CHECK_CONSOLE_IN_USE'
export const CHECK_TOKEN_EXPIRED = 'CHECK_TOKEN_EXPIRED'
export const CLEAR_USER_MSGS = 'CLEAR_USER_MSGS'
export const COMPOSE_CREATE_VM = 'COMPOSE_CREATE_VM'
export const CREATE_DISK_FOR_VM = 'CREATE_DISK_FOR_VM'
export const CREATE_VM = 'CREATE_VM'
export const DEFAULT_ENGINE_OPTION_VERSION = '_'
export const DEFAULT_ARCH = '_'
export const DELAYED_REMOVE_ACTIVE_REQUEST = 'DELAYED_REMOVE_ACTIVE_REQUEST'
export const DELETE_USER_OPTION = 'DELETE_USER_OPTION'
export const DELETE_VM_NIC = 'DELETE_VM_NIC'
export const DISMISS_USER_MSG = 'DISMISS_USER_MSG'
export const DISMISS_EVENT = 'DISMISS_EVENT'
export const DONT_DISTURB = 'DONT_DISTURB'
export const DOWNLOAD_CONSOLE_VM = 'DOWNLOAD_CONSOLE_VM'
export const EDIT_VM = 'EDIT_VM'
export const EDIT_VM_DISK = 'EDIT_VM_DISK'
export const EDIT_VM_NIC = 'EDIT_VM_NIC'
export const EXPORT_LOCALE = 'EXPORT_LOCALE'
export const FAILED_EXTERNAL_ACTION = 'FAILED_EXTERNAL_ACTION'
export const FETCH_OPTIONS = 'FETCH_OPTIONS'
export const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
export const GET_BY_PAGE = 'GET_BY_PAGE'
export const GET_CONSOLE_OPTIONS = 'GET_CONSOLE_OPTIONS'
export const GET_OPTION = 'GET_OPTION'
export const GET_SSH_KEY = 'GET_SSH_KEY'
export const GET_POOL = 'GET_POOL'
export const GET_POOLS = 'GET_POOLS'
export const GET_RDP_VM = 'GET_RDP_VM'
export const GET_VM = 'GET_VM'
export const GET_VM_CDROM = 'GET_VM_CDROM'
export const GET_VMS = 'GET_VMS'
export const LOAD_USER_OPTIONS = 'LOAD_USER_OPTIONS'
export const LOGIN = 'LOGIN'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const LOGOUT = 'LOGOUT'
export const MANUAL_REFRESH = 'MANUAL_REFRESH'
export const MAX_VM_MEMORY_FACTOR = 4 // see Edit VM flow; magic constant to stay aligned with Web Admin
export const MAX_VM_VCPU_EDIT = 4096
export const OPEN_CONSOLE_VM = 'OPEN_CONSOLE_VM'
export const PERSIST_OPTION = 'PERSIST_OPTION'
export const POOL_ACTION_IN_PROGRESS = 'POOL_ACTION_IN_PROGRESS'
export const REDIRECT = 'REDIRECT'
export const REMOVE_ACTIVE_REQUEST = 'REMOVE_ACTIVE_REQUEST'
export const REMOVE_DISK = 'REMOVE_DISK'
export const REMOVE_DISK_REMOVAL_PENDING_TASK = 'REMOVE_DISK_REMOVAL_PENDING_TASK'
export const REMOVE_SNAPSHOT_ADD_PENDING_TASK = 'REMOVE_SNAPSHOT_ADD_PENDING_TASK'
export const REMOVE_SNAPSHOT_REMOVAL_PENDING_TASK = 'REMOVE_SNAPSHOT_REMOVAL_PENDING_TASK'
export const REMOVE_SNAPSHOT_RESTORE_PENDING_TASK = 'REMOVE_SNAPSHOT_RESTORE_PENDING_TASK'
export const REMOVE_VM = 'REMOVE_VM'
export const RESTART_VM = 'RESTART_VM'
export const SAVE_CONSOLE_OPTIONS = 'SAVE_CONSOLE_OPTIONS'
export const SAVE_FILTERS = 'SAVE_FILTERS'
export const SAVE_GLOBAL_OPTIONS = 'SAVE_GLOBAL_OPTIONS'
export const SAVE_SSH_KEY = 'SAVE_SSH_KEY'
export const SET_ADMINISTRATOR = 'SET_ADMINISTRATOR'
export const SET_CHANGED = 'SET_CHANGED'
export const SET_CLUSTERS = 'SET_CLUSTERS'
export const SET_ACTIVE_CONSOLE = 'SET_ACTIVE_CONSOLE'
export const SET_CONSOLE_OPTIONS = 'SET_CONSOLE_OPTIONS'
export const SET_CONSOLE_TICKETS = 'SET_CONSOLE_TICKETS'
export const SET_CONSOLE_VALID = 'SET_CONSOLE_VALID'
export const SET_CONSOLE_NVNC = 'SET_CONSOLE_NVNC'
export const SET_CONSOLE_NOVNC_STATUS = 'SET_CONSOLE_NOVNC_STATUS'
export const SET_CPU_TOPOLOGY_OPTIONS = 'SET_CPU_TOPOLOGY_OPTIONS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_DATA_CENTERS = 'SET_DATA_CENTERS'
export const SET_DEFAULT_TIMEZONE = 'SET_DEFAULT_TIMEZONE'
export const SET_FILTERS = 'SET_FILTERS'
export const SET_HOSTS = 'SET_HOSTS'
export const SET_OPERATING_SYSTEMS = 'SET_OPERATING_SYSTEMS'
export const SET_OPTION = 'SET_OPTION'
export const SET_OVIRT_API_VERSION = 'SET_OVIRT_API_VERSION'
export const SET_ROLES = 'SET_ROLES'
export const SET_SSH_KEY = 'SET_SSH_KEY'
export const SET_STORAGE_DOMAIN_FILES = 'SET_STORAGE_DOMAIN_FILES'
export const SET_STORAGE_DOMAINS = 'SET_STORAGE_DOMAINS'
export const SET_TEMPLATES = 'SET_TEMPLATES'
export const SET_USB_AUTOSHARE = 'SET_USB_AUTOSHARE'
export const SET_USB_FILTER = 'SET_USB_FILTER'
export const SET_USER = 'SET_USER'
export const SET_USER_FILTER_PERMISSION = 'SET_USER_FILTER_PERMISSION'
export const SET_USER_GROUPS = 'SET_USER_GROUPS'
export const SET_USER_SESSION_TIMEOUT_INTERVAL = 'SET_USER_SESSION_TIMEOUT_INTERVAL'
export const SET_USER_MESSAGES = 'SET_USER_MESSAGES'
export const SET_USERMSG_NOTIFIED = 'SET_USERMSG_NOTIFIED'
export const SET_VM_ACTION_RESULT = 'SET_VM_ACTION_RESULT'
export const SET_VM_DISKS = 'SET_VM_DISKS'
export const SET_VM_NICS = 'SET_VM_NICS'
export const SET_VM_SESSIONS = 'SET_VM_SESSIONS'
export const SET_VM_SORT = 'SET_VM_SORT'
export const SET_VNIC_PROFILES = 'SET_VNIC_PROFILES'
export const SET_VM_SNAPSHOTS = 'SET_VM_SNAPSHOTS'
export const SET_WEBSOCKET = 'SET_WEBSOCKET'
export const SET_GLOBAL_DEFAULT_CONSOLE = 'SET_GLOBAL_DEFAULT_CONSOLE'
export const SET_GLOBAL_DEFAULT_VNC_MODE = 'SET_GLOBAL_DEFAULT_VNC_MODE'
export const SHOW_TOKEN_EXPIRED_MSG = 'SHOW_TOKEN_EXPIRED_MSG'
export const NAVIGATE_TO_VM_DETAILS = 'NAVIGATE_TO_VM_DETAILS'
export const SHUTDOWN_VM = 'SHUTDOWN_VM'
export const START_POOL = 'START_POOL'
export const START_VM = 'START_VM'
export const SUSPEND_VM = 'SUSPEND_VM'
export const UPDATE_ICONS = 'UPDATE_ICONS'
export const UPDATE_LAST_REFRESH = 'UPDATE_LAST_REFRESH'
export const UPDATE_VM_SNAPSHOT = 'UPDATE_VM_SNAPSHOT'
export const UPDATE_VM_DISK = 'UPDATE_VM_DISK'
export const UPDATE_VMS = 'UPDATE_VMS'
export const VM_ACTION_IN_PROGRESS = 'VM_ACTION_IN_PROGRESS'

export * from './background-refresh'
export * from './console'
export * from './pages'
