import axios from 'axios/index'



const API_URL = 'http://localhost:8081/api';
const CATEGORY_API_URL = `${API_URL}/category`;

export class CategoryApiService {
  findAllOrFilter = (sortBy, direction, offset, limit) => {
    return axios.get(CATEGORY_API_URL, {
      params: {
        sort_by: sortBy,
        direction: direction,
        offset: offset,
        limit: limit,
      }
    })
  }
}