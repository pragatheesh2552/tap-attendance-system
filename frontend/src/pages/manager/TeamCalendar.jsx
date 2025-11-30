// frontend/src/pages/manager/TeamCalendar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TeamCalendar({ token }) {
  const API = "http://localhost:5000/api";
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));
  const [data, setData] = useState([]);

  const load = async () => {
    const start = month + "-01";
    const end = new Date(month + "-01");
    end.setMonth(end.getMonth()+1);
    end.setDate(0);
    const endStr = end.toISOString().slice(0,10);
    const res = await axios.get(API + '/attendance/all', {
      headers: { Authorization: 'Bearer ' + token },
      params: { from: start, to: endStr }
    });
    setData(res.data || []);
  };

  useEffect(()=>{ load(); }, [month]);

  return (
    <div style={{ padding: 20 }}>
      <h3>Team Calendar (raw)</h3>
      <input type="month" value={month} onChange={e=>setMonth(e.target.value)} />
      <button onClick={load} style={{ marginLeft: 8 }}>Load</button>
      <p>Simple view showing monthly attendance JSON. For a visual calendar, we can integrate FullCalendar later.</p>
      <pre style={{ background: "#f7f7f7", maxHeight: 300, overflow: "auto", padding: 10 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
