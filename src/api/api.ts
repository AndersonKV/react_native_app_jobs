import axios from 'axios';
import { RoutesPath } from '../utils/routesPath';

export const api = axios.create({
  baseURL: RoutesPath.SERVER,
});
