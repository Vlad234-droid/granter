import React from "react";

import "./style.scss";
import HeaderSearch from "../../headerSearch";
import HeaderCompanies from "../../headerCompanies";
import HeaderNotification from "../../headerNotification";

const Header = () => {
  return (
    <header>
      <HeaderSearch />
      <HeaderCompanies />
      <HeaderNotification />
    </header>
  );
};

export default Header;
