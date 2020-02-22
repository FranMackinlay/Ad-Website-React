const api = (API_URL = 'http://34.89.93.186:8080') => {
  const registerApiEndpoint = `${API_URL}/apiv1/register`;
  const loginApiEndpoint = `${API_URL}/apiv1/login`;
  const adsApiEndpoint = `${API_URL}/apiv1/anuncios`;
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

        const isRegistrationSuccesfull = await response.json();
        const { success, error } = isRegistrationSuccesfull;
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

        const isLoginSuccesfull = await response.json();
        const { success, error } = isLoginSuccesfull;
        if (success) {
          return success;
        } else if (error) {
          return error;
        }


      } catch (err) {
        console.error(err);
      }
    },
    getAds: async () => {
      try {
        const response = await fetch(`${adsApiEndpoint}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          },
          credentials: 'include'
        });

        const isGetAdsSuccesfull = await response.json();
        const { success, error, results } = isGetAdsSuccesfull;

        if (success) {
          return results;
        } else if (error) {
          return error;
        }
      } catch (err) {
        console.error(err);
      }
    },
    getAdDetail: async id => {
      try {
        const response = await fetch(`${adsApiEndpoint}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const isGetAdDetailOk = await response.json();
        const { success, error, result } = isGetAdDetailOk;
        if (success) {
          return result;
        } else if (error) {
          return error;
        }
      } catch (err) {
        console.error(err);
      }
    },
    filterAd: async (query, value) => {
      try {
        const response = await fetch(`${adsApiEndpoint}?${query}=${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const isFilterAdOk = await response.json();
        const { success, error, results } = isFilterAdOk;
        if (success) {
          return results;
        } else if (error) {
          return error;
        }


      } catch (err) {
        console.error(err);
      }
    },
    createAd: async (name, price, description, tags, type, photo) => {
      try {
        console.log(tags);
        const response = await fetch(`${adsApiEndpoint}`, {
          method: 'POST',
          body: JSON.stringify({
            name: `${name}`,
            price: price,
            description: `${description}`,
            tags: tags,
            type: `${type}`,
            photo: `${photo}`
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const isCreateAdOk = await response.json();
        console.log(isCreateAdOk);


      } catch (err) {
        console.error(err);
      }
    }


  }
}

export default api;
