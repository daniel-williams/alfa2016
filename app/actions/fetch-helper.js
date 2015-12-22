

export function checkStatus(response) {
  console.log('CHECKSTATUS', response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  // console.log(response.json());
  return response.json();
}
