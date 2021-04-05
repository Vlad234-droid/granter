import React from "react";
import { Badge } from "antd";

import { IconNotifications } from "../icons";

import "./style.scss";

const HeaderNotification = () => {
  return (
    <div className='header__notification'>
      <button>
        <Badge count={5}>
          <IconNotifications />
        </Badge>
      </button>
    </div>
  );
};

export default HeaderNotification;
