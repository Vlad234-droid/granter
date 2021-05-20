import React from 'react';
import lockr from 'lockr';
import { notification } from 'antd';
import { IconWarning } from '../../components/icons';
const { REACT_APP_API_URL } = process.env;

const fetchProfileData = () => {
  const token = lockr.get('auth-key');
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/profile/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: 'error-message',
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch(reject);
  });
};

const postProfileData = (user) => {
  const token = lockr.get('auth-key');

  const formData = new FormData();
  for (let i in user) {
    formData.append(i, user[i]);
  }

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/profile/update/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: 'error-message',
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch(reject);
  });
};

const postCompanyData = (companyId, companyData) => {
  const token = lockr.get('auth-key');

  const formData = new FormData();
  for (let i in companyData) {
    formData.append(i, companyData[i]);
  }

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/profile/update/company/${companyId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: 'error-message',
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch(reject);
  });
};

const postCompanyLogo = (companyId, logo) => {
  const token = lockr.get('auth-key');

  const formData = new FormData();
  formData.append('logo', logo);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/profile/update/company/logo/${companyId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: 'error-message',
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch(reject);
  });
};

const addNewCompany = (company) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  for (let i in company) {
    if (i === 'industry_ids') {
      company[i].forEach((el, n) => {
        formData.append('industry_ids[' + n + ']', el.id);
      });
    } else {
      formData.append(i, company[i]);
    }
  }
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/profile/company/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: 'error-message',
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch(reject);
  });
};

const fetchChacngePassword = (company) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  for (let i in company) {
    formData.append(i, company[i]);
  }
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/change-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: 'error-message',
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.message);
      })
      .catch(reject);
  });
};

const fetchResetPassword = (email) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('email', email);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/password/forgot`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: 'error-message',
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.message);
      })
      .catch(reject);
  });
};

export {
  fetchProfileData,
  postProfileData,
  postCompanyData,
  postCompanyLogo,
  addNewCompany,
  fetchChacngePassword,
  fetchResetPassword,
};
