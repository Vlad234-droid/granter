import React, { useState, useEffect } from 'react';
import { Tooltip, Upload, Spin, Form, Input, Dropdown, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IconEditPencil, DeleteCompanySVG } from '../../../components/icons';
import iconUpload from '../../../assets/img/icon-upload.svg';
import { postCompanyData } from '../../../core/services';
import { postClientCompanyEdits, postCompanyLogo } from '../../../core/adminServices';

import './style.scss';
import { Link } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const { Dragger } = Upload;
const Company = ({ companies, company, updateCompany, setModal }) => {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loader, setLoader] = useState(false);
  const [logoLoader, setLogoLoader] = useState(false);
  const [loaderDelBtn, setLoaderDelBtn] = useState(false);
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

  const deleteCompanyActions = () => {
    setLoaderDelBtn(() => true);
    // deleteCompany(company?.id).then((data) => {
    //   if (data.success) {
    //     setLoaderDelBtn(() => true);
    //     notification.success({
    //       description: 'Company was deleted successfully',
    //     });
    //     setIsDropDownDelete((prev) => !prev);
    //     setCompaniesList((prev) => prev.filter((item) => item.id !== company?.id));
    //   }
    // });
  };

  const onSave = (form) => {
    setLoader(true);
    postClientCompanyEdits(company.id, form).then((data) => {
      setLoader(false);
      setEditMode(false);
      updateCompany(data);
    });
    // postCompanyData(company.id, form).then((data) => {
    //   setLoader(false);
    //   setEditMode(false);
    //   updateCompany(data);
    // });
  };

  const updateLogo = (e) => {
    setLogoLoader(true);
    postCompanyLogo(company.id, e.file).then((data) => {
      setLogoLoader(false);
      setCompanyLogo(data.avatar);
    });
    e.onSuccess('ok');
  };

  const getClameName = (status) => {
    let name;
    if (company.claims.filter((item) => item.status == status).length) {
      const claim = company.claims.filter((item) => item.status == status)[0];
      name = `${claim.title} ${claim.start_date} - ${claim.end_date}`;
      return name;
    }
    return '';
  };

  const menu = (
    <div className="wrapper_dropDown">
      <h4>Are you sure you want to delete this сompany? All the documents, claims will be deleted as well</h4>
      <div className="dropDown__btn_container">
        <Button
          type="button"
          onClick={() => {
            setIsDropDownDelete((prev) => !prev);
          }}>
          Back
        </Button>
        <Button type="primary" className="delete__red" loading={loaderDelBtn} onClick={deleteCompanyActions}>
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <li className="form_claims">
      <div className={`profile__company ${isDropDownDelete ? 'red_Company' : ''}`}>
        <div className="profile__company_title">
          <h3>
            <span>{company.name}</span>
          </h3>
          <div className="profile__wrapper_btn" id="btn_del">
            {!editMode && (
              <>
                <button
                  className="profile__btn_mode"
                  onClick={(e) => {
                    setEditMode(true);
                  }}>
                  <IconEditPencil />
                </button>
                {companies.length !== 1 && (
                  <button
                    onClick={() => {
                      setModal(true, company.id);
                      //setIsDropDownDelete((prev) => !prev);
                    }}
                    className="profile__btn_delete">
                    <DeleteCompanySVG />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <Form form={companyForm} onFinish={onSave}>
          <section className="profile__company_details">
            <div className="company--row">
              <div className="label">Registered Number</div>
              <div className="details">
                {!editMode ? (
                  <span>{company.number}</span>
                ) : (
                  <Form.Item
                    name="number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Company Number!',
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                )}
              </div>
            </div>
            <div className="company--row">
              <div className="label">Accountant Email</div>
              <div className="details">
                {!editMode ? (
                  <span>{company.accountant_email}</span>
                ) : (
                  <Form.Item
                    name="accountant_email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Company Email!',
                      },
                      {
                        type: 'email',
                        message: 'Please input valid Company Email!',
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                )}
              </div>
            </div>
            <div className="company--row">
              <div className="label">Revenue</div>
              <div className="details">
                {!editMode ? (
                  <span>{company.revenue}</span>
                ) : (
                  <Form.Item
                    name="revenue"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Revenue!',
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                )}
              </div>
            </div>
            <div className="company--row">
              <div className="label">UTR</div>
              <div className="details">
                {!editMode ? (
                  <span>{company.utr}</span>
                ) : (
                  <Form.Item
                    name="utr"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Revenue!',
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                )}
              </div>
            </div>
            <div className="company--row">
              <div className="label">SME or RDEC</div>
              <div className="details">
                {!editMode ? (
                  <span>{company.sme_or_rdec}</span>
                ) : (
                  <Form.Item
                    name="sme_or_rdec"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Revenue!',
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                )}
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
        {editMode && (
          <div className="profile__company_actions">
            <Button
              type="button"
              loading={loader}
              onClick={(e) => {
                setEditMode(false);
              }}>
              Cancel
            </Button>
            <Button
              type="primary"
              loading={loader}
              onClick={(e) => {
                companyForm.submit();
              }}>
              Save
            </Button>
          </div>
        )}
        {/* <Form form={companyForm} onFinish={onSave}>
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
        </Form> */}
      </div>
      <div className="block_claims">
        <div className="container_info">
          {company.claims.filter((item) => item.type == 1).length > 0 && (
            <>
              <h2>Active</h2>
              <ul>
                {company.claims
                  .filter((item) => item.type == 1)
                  .map((item) => (
                    <li key={`claim-${item.id}`}>
                      <Link to={`/admin/active-claim/${item.id}`}>{`${item.title}${
                        item.start_date && item.end_date ? ` ${item.start_date} - ${item.start_date}` : ``
                      }`}</Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
        <div className="container_info">
          {company.claims.filter((item) => item.type == 2).length > 0 && (
            <>
              <h2>Future</h2>
              <ul>
                {company.claims
                  .filter((item) => item.type == 2)
                  .map((item) => (
                    <li key={`claim-${item.id}`}>{`${item.title}${
                      item.start_date && item.end_date ? ` ${item.start_date} - ${item.start_date}` : ``
                    }`}</li>
                  ))}
              </ul>
            </>
          )}
        </div>
        <div className="container_info">
          {company.claims.filter((item) => item.type == 3).length > 0 && (
            <>
              <h2>Completed</h2>
              <ul>
                {company.claims
                  .filter((item) => item.type == 3)
                  .map((item) => (
                    <li key={`claim-${item.id}`}>{`${item.title}${
                      item.start_date && item.end_date ? ` ${item.start_date} - ${item.start_date}` : ``
                    }`}</li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default Company;
