import lockr from 'lockr';
const { REACT_APP_API_URL } = process.env;

export const getEstimate = async (industriesIDs, values) => {
  const { staffing_costs, materials_costs, subcontracting_costs, software_costs } = values;
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('industry_ids', industriesIDs);
  formData.append('staffing_costs', staffing_costs);
  formData.append('materials_costs', materials_costs);
  formData.append('subcontracting_costs', subcontracting_costs);
  formData.append('software_costs', software_costs);
  try {
    const res = await fetch(`${REACT_APP_API_URL}/core/estimate`, {
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
