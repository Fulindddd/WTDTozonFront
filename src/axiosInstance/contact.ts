import axios from 'axios';
import { baseUrl } from './api';

export const getContactList = async (
  pageNumber: number,
  pageSize: number,
  searchTerm?: { [key: string]: string | number | boolean | null },
  sort?: string,
  order?: string,
) => {
  const data = await axios(`${baseUrl}/manager/contact/getListPage`, {
    method: 'POST',
    data: {
      pageNumber,
      pageSize,
      sort,
      order,
      ...searchTerm,
    },
  });
  return Promise.resolve(data);
};
