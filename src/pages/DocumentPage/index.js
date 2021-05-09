import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Upload,
  Select,
  Button,
  Spin,
  Skeleton,
  Modal,
  Form,
  Input,
} from "antd";

import {
  getDocumentComments,
  postNewVersionDocument,
  postNewComment,
} from "../../core/services";

import DocumentViewer from "../../components/DocumentViewer";
import Comment from "../../components/Comment";
import { IconComment } from "../../components/icons";

import iconBack from "../../assets/img/arrow-left.svg";
import iconDownload from "../../assets/img/icon-download.svg";
import iconUpload from "../../assets/img/icon-upload-blue.svg";
import iconSelectArrow from "../../assets/img/iceon-select-arrow.svg";

import "./style.scss";

const { Dragger } = Upload;
const { Option } = Select;

const DocumentPage = () => {
  const { id, climeId } = useParams();
  const [commentsList, setCommentsList] = useState(null);
  const [document, setDocument] = useState(null);
  const [documentUploadLoader, setDocumentUploadLoader] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getDocumentComments(climeId, id).then((data) => {
      setCommentsList(data.comments);
      setDocument(data.document);
    });
  }, []);

  const uploadNewDocument = ({ file }) => {
    setDocumentUploadLoader(true);
    postNewVersionDocument(climeId, id, file).then((data) => {
      console.log(data.document);
      setDocument(data.document);
      setDocumentUploadLoader(false);
    });
  };

  return (
    <div className='document-details'>
      <div className='document-details__viewer'>
        <header className='document-details__header'>
          <Link to='/active-claims/' className='header--back'>
            <img src={iconBack} alt='' />
            <span>To Dashboard</span>
          </Link>
          {document && (
            <a href={document.url} className='header--download'>
              <img src={iconDownload} alt='' />
              <span>Download File</span>
            </a>
          )}
          <Dragger
            className='header--upload'
            name='file'
            customRequest={uploadNewDocument}
            accept='application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            showUploadList={false}
          >
            {documentUploadLoader && (
              <div className='loading'>
                <Spin />
              </div>
            )}
            <img src={iconUpload} alt='' />
            <span>Upload New Version</span>
          </Dragger>
        </header>
        <article className='document-wrapper'>
          {document && <DocumentViewer url={document.url} />}
        </article>
      </div>
      <div className='document-details__comments'>
        {!commentsList ? (
          <Skeleton />
        ) : (
          <>
            <div className='document-details__comments_header'>
              <div className='header--title'>
                <IconComment />
                <span>Comments ({commentsList.length})</span>
              </div>
              {commentsList.length > 0 && (
                <Select
                  defaultValue='all'
                  suffixIcon={<img src={iconSelectArrow} alt='' />}
                  dropdownMatchSelectWidth={false}
                >
                  <Option value='all'>All</Option>
                  <Option value='latest'>Latest</Option>
                </Select>
              )}
            </div>
            <div className='document-details__comments_list'>
              {commentsList.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </>
        )}
        <div className='document-details__comments_new'>
          <Button
            type='primary'
            onClick={(e) => {
              setIsModalVisible(true);
            }}
          >
            New Comment
          </Button>
        </div>
      </div>
      <Modal
        title='Basic Modal'
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <Form
          name='basic'
          onFinish={(form) => {
            postNewComment(climeId, id, form.username);
          }}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentPage;
