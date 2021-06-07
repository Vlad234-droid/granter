import lockr from 'lockr';
const { REACT_APP_API_URL } = process.env;

export const setUserToUnregister = async (values) => {
  const token = lockr.get('auth-key');
  const {
    staffing_costs,
    materials_costs,
    subcontracting_costs,
    software_costs,
    name,
    number,
    industry,
    modal_phone,
    modal_email,
  } = values;
  const arrId = industry.map((item) => item.id);
  const formData = new FormData();
  formData.append('industry_ids', arrId);
  formData.append('staffing_costs', staffing_costs);
  formData.append('materials_costs', materials_costs);
  formData.append('subcontracting_costs', subcontracting_costs);
  formData.append('software_costs', software_costs);
  formData.append('name', name);
  formData.append('number', number);
  formData.append('modal_phone', modal_phone);
  formData.append('modal_email', modal_email);
  try {
    const res = await fetch(`${REACT_APP_API_URL}/core/request-for-estimate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const resData = await res.json();
    if (resData.success) return res;
  } catch (error) {
    throw new Error(error);
  }
};
