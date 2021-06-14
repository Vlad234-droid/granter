import React, { useEffect } from 'react';

import { Input, AutoComplete } from 'antd';
import { searchService } from '../../core/services/searchService';

import './style.scss';

const options = [
  {
    label: 'Active Claims',
    options: [{ label: 'Claims - 1' }, { label: 'Claims - 2' }],
  },
  {
    label: 'Future Claims',
    options: [{ label: 'Claims - 1' }, { label: 'Claims - 2' }],
  },
  {
    label: 'Completed Claims',
    options: [{ label: 'Claims - 1' }, { label: 'Claims - 2' }],
  },
];

const HeaderSearch = () => {
  return (
    <div className="header__search">
      <AutoComplete dropdownClassName="header__search-dropdown" options={options}>
        <Input size="large" placeholder="Type to search for documents or claims..." />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
