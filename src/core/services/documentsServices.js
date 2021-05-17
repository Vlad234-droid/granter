import React from "react";
import actions from "../actions";
import lockr from "lockr";
import { bindActionCreators } from "redux";
import { notification } from "antd";

import { IconWarning } from "../../components/icons";

const { REACT_APP_API_URL } = process.env;

const getDocumentComments = (claimId, id) => {
  const token = lockr.get("auth-key");

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/documents/comments/${claimId}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: "error-message",
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

const postNewVersionDocument = (claimId, id, file) => {
  const token = lockr.get("auth-key");

  const formData = new FormData();
  formData.append("file", file);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/documents/upload/${claimId}/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
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
              className: "error-message",
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

const postNewComment = (claimId, id, text, is_reply, comment_id) => {
  const token = lockr.get("auth-key");

  const formData = new FormData();
  formData.append("text", text);
  formData.append("page", 1);
  if (is_reply) {
    formData.append("is_reply", is_reply);
    formData.append("comment_id", comment_id);
  }

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/documents/comment/${claimId}/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
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
              className: "error-message",
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

const removeComment = (claimId, documentId, commentId) => {
  const token = lockr.get("auth-key");

  return new Promise((resolve, reject) => {
    fetch(
      `${REACT_APP_API_URL}/documents/delete/comment/${claimId}/${documentId}/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: "error-message",
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

const getDocumentsManagerList = (step) => {
  const token = lockr.get("auth-key");

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/documents/get/${step}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: "error-message",
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data.documents);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDownloadList = (list) => {
  const token = lockr.get("auth-key");

  const formData = new FormData();
  list.forEach((file, i) => {
    formData.append(`document_ids[${i}]`, file.id);
  });
  // formData.append("file", file);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/documents/download/list`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: "error-message",
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  getDocumentComments,
  postNewVersionDocument,
  postNewComment,
  removeComment,
  getDocumentsManagerList,
  getDownloadList,
};
