//Функция 1
const checkStringLength = function(str, maxLength) {
  return str.length <= maxLength;
};
checkStringLength('проверяемая строка', 20);

//Фунция 2
const isPalindrome = function(str) {
  str = str.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
};
isPalindrome('топот');

//Функция 3
const getNumber = function(str){
  str = str.toString();
  let result = '';
  for(let i = 0; i < str.length; i++){
    str = str.toString.replaceAll(' ','');
    if(!isNaN(str[i])){
      const number = parseInt(str[i], 10);
      result+=number;
    }
  }
  return result==='' ? NaN : result;
};
getNumber('2023 год');
