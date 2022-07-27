export function b64toBlob(dataURI) {
    
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}

export function IsNullorWhiteSpace(obj) {
    let isNullVal = false
    if (
      obj != null &&
      obj !== undefined &&
      obj !== '' &&
      obj !== 'null' &&
      obj !== 'undefined'
    ) {
      isNullVal = false
    } else {
      isNullVal = true
    }
    return isNullVal
  }
  
  export function GetBool(data, isAllowNull = false) {
    let value = false
    if (
      data != null &&
      data !== undefined &&
      data.toString() !== '' &&
      data.toString().toLowerCase() === 'true'
    ) {
      value = true
    } else {
      value = isAllowNull === true ? null : false
    }
    return value
  }
  
  
  