export const ErrorCodes = {
    // user errors, prefix with EU
    MESSAGE_NOT_FOUND: 'EU100',
    MESSAGE_CONTENT_INVALID: 'EU101',
    MESSAGE_ID_MISSING: 'EU102',

    // server errors, prefix with SU
    MESSAGE_CREATE_FAIL: 'SU100',
    MESSAGE_DELETE_FAIL: 'SU101',
    DATABASE_CONNECT_FAIL: 'SU102',
    DATABASE_INIT_FAIL: 'SU103',
    ATTEMPT_TO_PERSISTE_NONPERSISTING: 'SU104', // thrown when an object of invalid type is sent to db for persistance
    DATABASE_INSERT_FAIL: 'SU105', // generic insert error code
    DATABASE_GETALL_FAIL: 'SU106',
    MESSAGE_GETALL_FAIL: 'SU107',
    DATABASE_GET_FAIL: 'SU108',
    MESSAGE_GET_FAIL: 'SU109',
    DATABASE_DELETE_FAIL: 'SU110'
};