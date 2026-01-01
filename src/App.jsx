import React, { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import EditModal from "./components/EditModal";

const TAX_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/taxes";
const COUNTRY_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/countries";

export default function App() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [loading, setLoading] = useState(true);

//fetch data and countries
useEffect(() => {
  
  fetch(TAX_URL)
    .then(r => r.json())
    .then(taxes => {
      setData(taxes);
      setLoading(false); 
    });
  fetch(COUNTRY_URL)
    .then(r => r.json())
    .then(setCountries);
}, []);



  useEffect(() => {
    if (editRow) {
      setName(editRow.entity ?? "");
      setCountryId(editRow.countryId ?? "");
    }
  }, [editRow]);
  

  //columns required
  const columns = [
    {
      accessorKey: "entity",
      header: "Entity",
      cell: ({ getValue }) => (
        <span className="text-purple-600 font-semibold hover:underline cursor-pointer">
          {getValue()}
        </span>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ getValue }) => {
        const g = getValue();
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
            ${g?.toLowerCase() === "male"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"}`}
          >
            {g}
          </span>
        );
      },
    },
    {
      accessorKey: "requestDate",
      header: "Request date",
      cell: ({ getValue }) =>(
       new Date(getValue()).toLocaleDateString("en-US", {
       month: "short",
       day: "2-digit",
      year: "numeric",
    }))

    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => (
        <button
          onClick={() => setEditRow(row.original)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          ✏️
        </button>
      ),
    },
  ];
   
  //save update
const save = async () => {
  const selected = countries.find(c => c.id === countryId);
  if (!selected) return;

  const updated = {
    ...editRow,
    entity: name,
    countryId: selected.id,
    country: selected.name,
  };

  // 1️⃣ Update UI immediately
  setData(prev =>
    prev.map(r => (r.id === updated.id ? updated : r))
  );
  setEditRow(null); // close modal instantly

  // 2️⃣ Send API request in background
  try {
    await fetch(`${TAX_URL}/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  } catch (err) {
    console.error("Save failed", err);
    // optional rollback
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Customer Tax Records
        </h1>

        <DataTable data={data} columns={columns} loading={loading} />
      </div>

      <EditModal
        open={!!editRow}
        name={name}
        setName={setName}
        countryId={countryId}
        setCountryId={setCountryId}
        countries={countries}
        onClose={() => setEditRow(null)}
        onSave={save}
      />
    </div>
  );
}
