import Cookies from 'js-cookie'

const TokenKey = "yy_chat_room-key"

export function authTokenGet() {
    return Cookies.get(TokenKey)
}

export function authTokenSet(token) {
    return Cookies.set(TokenKey, token)
}

export function authTokenRemove() {
    return Cookies.remove(TokenKey)
}



