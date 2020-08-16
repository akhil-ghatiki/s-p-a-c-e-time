import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.github.com/repos/akhil-ghatiki/akhil-ghatiki.github.io',
  responseType: 'json'
});
