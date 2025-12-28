const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const getAssignments = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/assignments`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
};

export const executeSQL = async (query) => {
  try {
    const res = await fetch(`${API_BASE}/api/sql/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Error executing SQL:', error);
    throw error;
  }
};

export const getHint = async (question, query) => {
  try {
    const res = await fetch(`${API_BASE}/api/sql/hint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        question: question,
        query: query,
        userQuery: query 
      }),
    });
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Error getting hint:', error);
    throw error;
  }
};
