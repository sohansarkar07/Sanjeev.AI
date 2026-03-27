const BASE_URL = 'http://localhost:5000/api';

// ----------------------------------------------------
// FRONTEND API CLIENT
// ----------------------------------------------------
export const api = {
  // Authentication -> Matches Express Server
  register: async (name, role, passkey) => {
    try {
      const resp = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, passkey })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Server Error');
      return data;
    } catch (err) {
      console.error('API Error [Register]:', err);
      throw err;
    }
  },

  login: async (role, passkey) => {
    try {
      const resp = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, passkey })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Server Error');
      return data;
    } catch (err) {
      console.error('API Error [Login]:', err);
      throw err;
    }
  },

  // Profile Data Fetching
  getProfile: async (userId) => {
    try {
      const resp = await fetch(`${BASE_URL}/users/${userId}/profile`);
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Server Error');
      return data;
    } catch (err) {
      console.error('API Error [Profile]:', err);
      throw err;
    }
  }
};
