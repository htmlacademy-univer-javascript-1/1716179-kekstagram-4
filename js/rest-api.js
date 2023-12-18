const urls = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram',
};

const buildFetchRequest = (method, body) => ({
  method: method,
  body: body,
});

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

const pushRequest = (success, error, method, body) => {
  fetch(urls[method], buildFetchRequest(method, body))
    .then(handleResponse)
    .then((data) => {
      success(data);
    })
    .catch((message) => {
      error(message);
    });
};

const getData = (success, error, method = 'GET') => {
  pushRequest(success, error, method);
};

const postData = (success, error, method = 'POST', body) => {
  pushRequest(success, error, method, body);
};

export { getData, postData };
