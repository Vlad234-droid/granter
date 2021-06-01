import React from 'react';
import actions from '../actions';
import lockr from 'lockr';
import { bindActionCreators } from 'redux';
import { notification } from 'antd';

import { IconWarning } from '../../components/icons';

const { REACT_APP_API_URL } = process.env;

const getActiveClaimData = (dispatch, companyId) => {
  const token = lockr.get('auth-key');

  const { setUserActiveClimeId } = bindActionCreators(actions, dispatch);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/claims/active/${companyId}`, {
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
            throw new Error(resp);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
        setUserActiveClimeId(data.data.id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getIntroductionClaimStep = (claimId) => {
  const token = lockr.get('auth-key');
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/claims/stage/introduction/${claimId}`, {
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
      .catch((error) => {
        reject(error);
      });
  });
};

const getFinancialClaimStep = (claimId) => {
  const token = lockr.get('auth-key');
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/claims/stage/financial/${claimId}`, {
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
      .catch((error) => {
        reject(error);
      });
  });
};

const getTechnicalClaimStep = (claimId) => {
  const token = lockr.get('auth-key');
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/claims/stage/technical/${claimId}`, {
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
      .catch((error) => {
        reject(error);
      });
  });
};

const setSkipFile = (claimId, fileId) => {
  const token = lockr.get('auth-key');
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/documents/skip/${claimId}/${fileId}`, {
      method: 'POST',
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
      .catch((error) => {
        reject(error);
      });
  });
};

const uploadFile = (claimId, fileId, file) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('file', file);
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/documents/upload/${claimId}/${fileId}`, {
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
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteFile = (claimId, fileId) => {
  const token = lockr.get('auth-key');
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/documents/delete/${claimId}/${fileId}`, {
      method: 'DELETE',
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
      .catch((error) => {
        reject(error);
      });
  });
};

const setNewProject = (claimId, form) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();

  for (let i in form) {
    if (i === 'documents') {
      form[i].forEach((doc, index) => {
        formData.append(`${i}[${index}]`, doc);
      });
    } else {
      if (form[i]) formData.append(i, form[i]);
    }
  }

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/projects/add/${claimId}`, {
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
      .catch((error) => {
        reject(error);
      });
  });
};

const editProject = (claimId, projectId, form) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();

  for (let i in form) {
    if (form[i]) formData.append(i, form[i]);
  }

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/projects/edit/${claimId}/${projectId}`, {
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
      .catch((error) => {
        reject(error);
      });
  });
};

const addDocumentToProject = (claimId, projectId, file, is_main) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('document', file);
  if (is_main) formData.append('is_main', is_main);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/projects/add/document/${claimId}/${projectId}`, {
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
      .catch((error) => {
        reject(error);
      });
  });
};

const removeProject = (claimId, projectId) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/projects/delete/${claimId}/${projectId}`, {
      method: 'DELETE',
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
      .catch((error) => {
        reject(error);
      });
  });
};

const removeDocumentFromProject = (claimId, projectId, documentId) => {
  const token = lockr.get('auth-key');

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/projects/delete/document/${claimId}/${projectId}/${documentId}`, {
      method: 'DELETE',
      headers: {
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
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  getActiveClaimData,
  getIntroductionClaimStep,
  getFinancialClaimStep,
  getTechnicalClaimStep,
  setSkipFile,
  deleteFile,
  uploadFile,
  setNewProject,
  removeProject,
  editProject,
  addDocumentToProject,
  removeDocumentFromProject,
};
