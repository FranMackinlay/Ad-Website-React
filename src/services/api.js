const api = (API_URL = 'http://34.89.93.186:8080') => {
  const registerApiEndpoint = `${API_URL}/apiv1/register`;
  const loginApiEndpoint = `${API_URL}/apiv1/login`;
  return {
    register: async (username, password) => {
      try {
        const response = await fetch(`${registerApiEndpoint}`, {
          method: 'POST',
          body: JSON.stringify({
            username: `${username}`,
            password: `${password}`
          }),
          headers: {
            'Content-type': 'application/json'
          },
          credentials: 'include'
        })

        const isSuccesfull = await response.json();
        console.log(isSuccesfull);
        const { success, error } = isSuccesfull;
        console.log(success, error);
        if (success) {
          return success;
        } else if (error) {
          return error;
        }
      } catch (err) {
        console.error(err);
      }
    },
    login: async (username, password) => {
      try {
        const response = await fetch(`${loginApiEndpoint}`, {
          method: 'POST',
          body: JSON.stringify({
            username: `${username}`,
            password: `${password}`
          }),
          headers: {
            'Content-type': 'application/json'
          },
          credentials: 'include'
        })

        console.log(response.json());


      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default api;
