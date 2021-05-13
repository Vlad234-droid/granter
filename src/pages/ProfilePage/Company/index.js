import React, { useState, useEffect } from "react";
import {
  Skeleton,
  Checkbox,
  Upload,
  Spin,
  Input,
  Select,
  Form,
  Button,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { IconEditPencil, IconDeleteFile } from "../../../components/icons";
import iconUpload from "../../../assets/img/icon-upload.svg";

import { postCompanyData, postCompanyLogo } from "../../../core/services";

import "./style.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const { Dragger } = Upload;
const Company = ({ company, updateCompany }) => {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loader, setLoader] = useState(false);
  const [logoLoader, setLogoLoader] = useState(false);
  const [companyForm] = Form.useForm();

  useEffect(() => {
    companyForm.setFieldsValue({
      number: company.number,
      accountant_email: company.accountant_email,
      revenue: company.revenue,
      utr: company.utr,
      sme_or_rdec: company.sme_or_rdec,
    });
    setCompanyLogo(company.avatar);
  }, [company]);

  const onSave = (form) => {
    setLoader(true);
    postCompanyData(company.id, form).then((data) => {
      setLoader(false);
      setEditMode(false);
      updateCompany(data);
    });
  };

  const updateLogo = (e) => {
    setLogoLoader(true);
    postCompanyLogo(company.id, e.file).then((data) => {
      setLogoLoader(false);
      setCompanyLogo(data.avatar);
    });
    e.onSuccess("ok");
  };

  return (
    <li className='profile__company'>
      <div className='profile__company_title'>
        <h3>
          <span>{company.name}</span>
          <button
            onClick={(e) => {
              setEditMode(true);
            }}
          >
            <IconEditPencil />
          </button>
        </h3>
        {editMode && (
          <Button
            type='button'
            loading={loader}
            onClick={(e) => {
              companyForm.submit();
            }}
          >
            Save
          </Button>
        )}
      </div>
      <Form
        form={companyForm}
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onSave}
        // onFinishFailed={onFinishFailed}
      >
        <section className='profile__company_details'>
          <div className='company--row'>
            <div className='label'>Number</div>
            <div className='details'>
              {!editMode ? (
                <span>{company.number}</span>
              ) : (
                <Form.Item
                  name='number'
                  rules={[
                    {
                      required: true,
                      message: "Please input Company Number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
            </div>
          </div>
          <div className='company--row'>
            <div className='label'>Accountant Email</div>
            <div className='details'>
              {!editMode ? (
                <span>{company.accountant_email}</span>
              ) : (
                <Form.Item
                  name='accountant_email'
                  rules={[
                    {
                      required: true,
                      message: "Please input Company Email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
            </div>
          </div>
          <div className='company--row'>
            <div className='label'>Revenue</div>
            <div className='details'>
              {!editMode ? (
                <span>{company.revenue}</span>
              ) : (
                <Form.Item
                  name='revenue'
                  rules={[
                    {
                      required: true,
                      message: "Please input Revenue!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
            </div>
          </div>
          <div className='company--row'>
            <div className='label'>UTR</div>
            <div className='details'>
              {!editMode ? (
                <span>{company.utr}</span>
              ) : (
                <Form.Item
                  name='utr'
                  rules={[
                    {
                      required: true,
                      message: "Please input Revenue!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
            </div>
          </div>
          <div className='company--row'>
            <div className='label'>SME or RDEC</div>
            <div className='details'>
              {!editMode ? (
                <span>{company.sme_or_rdec}</span>
              ) : (
                <Form.Item
                  name='sme_or_rdec'
                  rules={[
                    {
                      required: true,
                      message: "Please input Revenue!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
            </div>
          </div>
          <div className='company--row'>
            <div className='label'>Assigned Consultant (TODO!!)</div>
            <div className='details'>Michael, +44 (0)20 7887 8888</div>
          </div>
          <div className='company--row'>
            <div className='label'>Company Logo</div>
            <div className='details'>
              {companyLogo ? (
                <div className='company--logo'>
                  <Dragger customRequest={updateLogo} showUploadList={false}>
                    {logoLoader && (
                      <div className='upload-loading'>
                        <Spin indicator={antIcon} />
                      </div>
                    )}
                    <img src={companyLogo} />
                  </Dragger>
                </div>
              ) : (
                // <div className='company--logo'>
                //   <img src={companyLogo} />
                //   <button type='button'>
                //     <IconDeleteFile />
                //   </button>
                // </div>
                <Dragger customRequest={updateLogo} showUploadList={false}>
                  {logoLoader && (
                    <div className='upload-loading'>
                      <Spin indicator={antIcon} />
                    </div>
                  )}
                  <div className='upload-title'>
                    <img src={iconUpload} alt='' />
                    <span>Upload Logo</span>
                  </div>
                </Dragger>
              )}
            </div>
          </div>
        </section>
      </Form>
    </li>
  );
};

export default Company;
