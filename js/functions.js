function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrome(str) {
  str = str.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

