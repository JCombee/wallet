import MD5 from 'crypto-js/md5';

export function hashObjectByAttr (transaction, attr) {
  return MD5(stringifyObjectByAttr(transaction, attr))
}

function stringifyObjectByAttr (transaction, attr, i = 0) {
  if (attr.length <= i + 1) {
    return transaction[ attr[ i ] ]
  }
  return transaction[ attr[ i ] ] + hash(transaction, attr, i + 1)
}