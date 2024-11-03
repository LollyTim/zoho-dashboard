// Dashboard.jsx

import { useEffect, useState } from "react";
import Table from "./Table";
import SearchFilter from "./SearchFilter";
import {
  fetchLeads,
  fetchContacts,
  fetchDeals,
} from "../services/zohoApiService";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState("Leads");

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (view === "Leads") result = await fetchLeads();
      else if (view === "Contacts") result = await fetchContacts();
      else if (view === "Deals") result = await fetchDeals();
      setData(result?.data || []);
    };
    fetchData();
  }, [view]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Zoho CRM Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setView("Leads")} className="btn">
          Leads
        </button>
        <button onClick={() => setView("Contacts")} className="btn">
          Contacts
        </button>
        <button onClick={() => setView("Deals")} className="btn">
          Deals
        </button>
      </div>
      <SearchFilter setData={setData} />
      <Table data={data} />
    </div>
  );
};

export default Dashboard;
