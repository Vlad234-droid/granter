import lockr from 'lockr';

const { REACT_APP_API_URL } = process.env;

export const searchService = async (searchText) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('q', searchText);
  try {
    const getSearchInfo = await fetch(`${REACT_APP_API_URL}/claims/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await getSearchInfo.json();
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
};
