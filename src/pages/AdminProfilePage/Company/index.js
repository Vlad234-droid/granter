import React, { useState, useEffect } from 'react';
import { Tooltip, Upload, Spin, Form } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import iconUpload from '../../../assets/img/icon-upload.svg';
import { postCompanyData, postCompanyLogo } from '../../../core/services';
import './style.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const { Dragger } = Upload;
const Company = ({ company, updateCompany }) => {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loader, setLoader] = useState(false);
  const [logoLoader, setLogoLoader] = useState(false);
  const [companyForm] = Form.useForm();
  const [isDropDownDelete, setIsDropDownDelete] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;

    companyForm.setFieldsValue({
      number: company.number,
      accountant_email: company.accountant_email,
      revenue: company.revenue,
      utr: company.utr,
      sme_or_rdec: company.sme_or_rdec,
    });
    if (!cleanupFunction) setCompanyLogo(company.avatar);

    return () => (cleanupFunction = true);
  }, [company, companyForm]);

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
    e.onSuccess('ok');
  };

  return (
    <li className="form_claims">
      <div className={`profile__company ${isDropDownDelete ? 'red_Company' : ''}`}>
        <div className="profile__company_title">
          <h3>
            <span>{company.name}</span>
          </h3>
        </div>
        <Form form={companyForm} onFinish={onSave}>
          <section className="profile__company_details">
            <div className="company--row">
              <div className="label">Number</div>
              <div className="details">
                <span>{company.number}</span>
              </div>
            </div>
            <div className="company--row">
              <div className="label">Accountant Email</div>
              <div className="details">
                <span>{company.accountant_email}</span>
              </div>
            </div>
            <div className="company--row">
              <div className="label">Revenue</div>
              <div className="details">
                <span>{company.revenue}</span>
              </div>
            </div>
            <div className="company--row">
              <div className="label">UTR</div>
              <div className="details">
                <span>{company.utr}</span>
              </div>
            </div>
            <div className="company--row">
              <div className="label">SME or RDEC</div>
              <div className="details">
                <span>{company.sme_or_rdec}</span>
              </div>
            </div>
            <div className="company--row">
              <div className="label">Assigned Consultant</div>
              <div className="details">
                {company.manager && (
                  <>
                    <span className="manager">{company.manager.name},</span>{' '}
                    <span className="manager">{company.manager.phone}</span>
                  </>
                )}
              </div>
            </div>
            <div className="company--row">
              <div className="label">Company Logo</div>
              <div className="details">
                {companyLogo ? (
                  <div className="company--logo">
                    <Dragger
                      customRequest={updateLogo}
                      showUploadList={false}
                      accept="image/png, image/gif, image/jpeg">
                      {logoLoader && (
                        <div className="upload-loading">
                          <Spin indicator={antIcon} />
                        </div>
                      )}
                      <Tooltip placement="top" title="Upload png or jpeg">
                        <img src={companyLogo} alt={companyLogo} />
                      </Tooltip>
                    </Dragger>
                  </div>
                ) : (
                  <Dragger customRequest={updateLogo} showUploadList={false} accept="image/png, image/gif, image/jpeg">
                    {logoLoader && (
                      <div className="upload-loading">
                        <Spin indicator={antIcon} />
                      </div>
                    )}
                    <Tooltip placement="top" title="Upload png or jpeg">
                      <div className="upload-title">
                        <img src={iconUpload} alt="" />
                        <span>Upload Logo</span>
                      </div>
                    </Tooltip>
                  </Dragger>
                )}
              </div>
            </div>
          </section>
        </Form>
      </div>
      <div className="block_claims">
        <div className="container_info">
          <h2>Active</h2>
          <ul>
            <li>Claim 1 01/01/2018–31/12/2018</li>
          </ul>
        </div>
        <div className="container_info">
          <h2>Future</h2>
          <ul>
            <li>Claim 1 01/01/2018–31/12/2018</li>
          </ul>
        </div>
        <div className="container_info">
          <h2>Completed</h2>
          <ul>
            <li>Claim 1 01/01/2018–31/12/2018</li>
            <li>Claim 1 01/01/2018–31/12/2018</li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default Company;
