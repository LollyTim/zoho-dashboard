// src/services/zohoApiService.js

const fetchZohoData = async (endpoint) => {
  try {
    const response = await fetch(`http://localhost:4000/api/${endpoint}`);
    if (!response.ok) throw new Error("Failed to fetch data from Zoho CRM");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchLeads = async () => await fetchZohoData("Leads");
export const fetchContacts = async () => await fetchZohoData("Contacts");
export const fetchDeals = async () => await fetchZohoData("Deals");
