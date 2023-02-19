import ky from 'ky';
import { NoteAPI } from './note.api';

const baseURL = import.meta.env.VITE_API_URL || 'api';
const baseApi = ky.create({ prefixUrl: baseURL });

export const api = {
  note: new NoteAPI(baseApi),
};

export const defaultOption = {
  itemsPerPage: 20,
  currentPage: 1,
  totalPage: 1,
};
