const API_BASE = "https://learningsql.onrender.com";

export const getAssignments = async () => {
  const res = await fetch(`${API_BASE}/api/assignments`);
  return res.json();
};

export const executeSQL = async (query) => {
  const res = await fetch(`${API_BASE}/api/sql/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return res.json();
};

export const getHint = async (question, query) => {
  const res = await fetch(`${API_BASE}/api/sql/hint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, query }),
  });
  return res.json();
};
