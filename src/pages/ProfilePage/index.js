import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton, Checkbox, Upload, Spin, Input, Select } from "antd";

import Layout from "../../components/LayoutDashboard/Layout";
import { fetchProfileData } from "../../core/services";

import { IconEditPencil, IconWarning, IconAdd } from "../../components/icons";
import iconUpload from "../../assets/img/icon-upload.svg";
import iconSelectArrow from "../../assets/img/iceon-select-arrow.svg";

import "./style.scss";

const { Dragger } = Upload;
const { Option } = Select;

const ProfilePage = () => {
  const [editModeGeneral, setEditModeGeneral] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <Layout isLogged={false} className='dashboard profile'>
      <div className='profile__general'>
        <h2>
          <span>Personal Information</span>
          <button
            onClick={(e) => {
              setEditModeGeneral(true);
            }}
          >
            <IconEditPencil />
          </button>
        </h2>
        <ul className='profile__general_table'>
          <li>
            <div className='label'>Full Name</div>
            <div className='details'>
              {!editModeGeneral ? (
                <span>Michael Cormac Newell</span>
              ) : (
                <Input value='Michael Cormac Newell' />
              )}
            </div>
          </li>
          <li>
            <div className='label'>Team Role</div>
            <div className='details'>
              {!editModeGeneral ? (
                <span>Venture Capitalist</span>
              ) : (
                <Select
                  suffixIcon={<img src={iconSelectArrow} alt='' />}
                  dropdownMatchSelectWidth={false}
                  defaultValue='jack'
                >
                  <Option value='jack'>Venture Capitalist</Option>
                  <Option value='lucy'>Venture Capitalist - 2</Option>
                  <Option value='Yiminghe'>Venture Capitalist - 3</Option>
                </Select>
              )}
              {/* <div className='alert'>
                <IconWarning />
                <span>Not Setted</span>
                <a href=''>Set the Role</a>
              </div> */}
            </div>
          </li>
          <li>
            <div className='label'>Registered Address</div>
            <div className='details'>
              {!editModeGeneral ? (
                <span>High St, St Albans AL3 4EL, United Kingdom</span>
              ) : (
                <Input value='High St, St Albans AL3 4EL, United Kingdom' />
              )}
            </div>
          </li>
          <li>
            <div className='label'>ID Verification status</div>
            <div className='details'>
              <div className='alert'>
                <IconWarning />
                <span>Not Verified</span>
                <a href=''>Verify</a>
              </div>
            </div>
          </li>
          <li>
            <div className='label'>Your Email</div>
            <div className='details'>
              <span>newell@gmail.com</span>
              <p>
                <Checkbox>Receive all notifications</Checkbox>
              </p>
            </div>
          </li>
          <li>
            <div className='label'>Your Phone Number</div>
            <div className='details'>
              {!editModeGeneral ? (
                <span>+4402078878888</span>
              ) : (
                <Input value='+4402078878888' />
              )}
            </div>
          </li>
          <li>
            <div className='label'>Your Password</div>
            <div className='details'>
              <a href=''>Change password</a>
            </div>
          </li>
        </ul>
      </div>
      <div className='profile__companies'>
        <h2>
          <span>My Companies</span>
          <button>
            <IconAdd />
          </button>
        </h2>
        <ul className='profile__companies_list'>
          <li className='profile__company'>
            <h3>
              <span>St.James Company</span>
              <button>
                <IconEditPencil />
              </button>
            </h3>
            <section className='profile__company_details'>
              <div className='company--row'>
                <div className='label'>Number</div>
                <div className='details'>37687 1287409 989</div>
              </div>
              <div className='company--row'>
                <div className='label'>Accountant Email</div>
                <div className='details'>accountantemail@gmail.com</div>
              </div>
              <div className='company--row'>
                <div className='label'>Revenue</div>
                <div className='details'>£ 300 per year</div>
              </div>
              <div className='company--row'>
                <div className='label'>UTR</div>
                <div className='details'>8767 7366 87</div>
              </div>
              <div className='company--row'>
                <div className='label'>SME or RDEC</div>
                <div className='details'>RDEC</div>
              </div>
              <div className='company--row'>
                <div className='label'>Assigned Consultant</div>
                <div className='details'>Michael, +44 (0)20 7887 8888</div>
              </div>
              <div className='company--row'>
                <div className='label'>Company Logo</div>
                <div className='details'>
                  <Dragger>
                    {/* <div className='upload-loading'>
                        <Spin />
                      </div> */}
                    <div className='upload-title'>
                      <img src={iconUpload} alt='' />
                      <span>Upload Logo</span>
                    </div>
                  </Dragger>
                </div>
              </div>
            </section>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default ProfilePage;
