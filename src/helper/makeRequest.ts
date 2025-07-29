import axios, { formToJSON } from 'axios';

const makeRequest = async (
  reqType: string,
  path: string,
  body: object = {},
  header: object = {}
): Promise<any> => {
  try {
    // const BASE_URL = 'http://localhost:8080';
    const BASE_URL = 'https://8a41a84d79f8.ngrok-free.app';
    const url = BASE_URL + path;
    const tok_n = await localStorage.getItem('token');
    if (tok_n) {
      header['Authorization'] = `Bearer ${tok_n}`;
      header['ngrok-skip-browser-warning'] = '69420';
    }
    switch (reqType.toUpperCase()) {
      case 'GET': {
        const response = await axios.get(url, {
          headers: header,
        });
        console.log(url, '*****', response);
        return response.data;
      }
      case 'POST': {
        console.log(url, body, header);
        const response = await axios.post(url, body, { headers: header });
        return response.data;
      }
      case 'PUT': {
        const response = await axios.put(url, body, { headers: header });
        return response.data;
      }
      case 'DELETE': {
        const response = await axios.delete(url, {
          headers: header,
          data: body,
        });
        return response.data;
      }
      default: {
        console.error('Type of request is not correct.');
        return null;
      }
    }
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
};

export default makeRequest;
