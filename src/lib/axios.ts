// src/lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL:'https://smarts-vendas-node.onrender.com'
  // 'http://localhost:3000'

})
