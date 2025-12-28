const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

console.log('API_BASE:', API_BASE);

export const getAssignments = async () => {
  try {
    console.log('Fetching from:', `${API_BASE}/api/assignments`);
    const res = await fetch(`${API_BASE}/api/assignments`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
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
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Execute SQL error:', error);
    throw error;
  }
};

export const getHint = async (question, query) => {
  try {
    const res = await fetch(`${API_BASE}/api/sql/hint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        question, 
        query,
        userQuery: query 
      }),
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Get hint error:', error);
    throw error;
  }
};