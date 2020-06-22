
//Creates collision-resistant universally unique ids, prefixed by type
//so as to be recognizeable at a glance (in a URL, array, etc).
import * as cuid from 'cuid' //Collision-resistant UUIDs for session IDs

const ilog = console.log; 
const elog = console.error;


export enum IdPrefix {
  USER = 'us',
  POST = 'po',
  SESSION = 'se',
}


export function genUserId(): String {
  return genId(IdPrefix.USER)
}

export function genSessionId(): String {
  return genId(IdPrefix.SESSION)
}

export function genPostId(): String {
  return genId(IdPrefix.POST)
}


export function genId(idPrefix: IdPrefix): String {
    return idPrefix + '-' + cuid()
}


