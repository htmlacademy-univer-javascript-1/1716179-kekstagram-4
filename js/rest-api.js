const urls = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram',
};

const pushRequest = (success, error, method, body) =>{
  fetch ( urls[method], {
    method: method,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      success(data);
    })
    .catch((message) => {
      error(message);
    });
};

const getData = (success, error, method = 'GET') => pushRequest(success, error, method);

const postData = (success, error, method = 'POST', body) => pushRequest(success, error, method, body);

export{getData, postData};
