const api = (API_URL = 'http://ec2-3-19-218-251.us-east-2.compute.amazonaws.com') => {
  const registerApiEndpoint = `${API_URL}/api/register`;
  const loginApiEndpoint = `${API_URL}/api/authenticate`;
  const adsApiEndpoint = `${API_URL}/api/ads`;
  const editAdApiEndpoint = `${API_URL}/apiv1/anuncios/`;
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
          // credentials: 'include'
        });

        const isRegistrationSuccesfull = await response.json();

        return isRegistrationSuccesfull;
      } catch (err) {
        console.error(err);
      }
    },
    login: async (username, password) => {
      try {
        const response = await fetch(`${loginApiEndpoint}`, {
          method: 'POST',
          body: JSON.stringify({
            email: `${username}`,
            password: `${password}`
          }),
          headers: {
            'Content-type': 'application/json'
          },
          // // credentials: 'include'
        });

        const isLoginSuccesfull = await response.json();

        console.log('LOGIN', isLoginSuccesfull);

        return isLoginSuccesfull;

      } catch (err) {
        console.error(err);
      }
    },
    getAds: async (token) => {
      try {
        const response = await fetch(`http://ec2-3-19-218-251.us-east-2.compute.amazonaws.com/api/ads?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          },
          // // credentials: 'include'
        });
        const isGetAdsSuccesfull = await response.json();

        const results = {
          results: isGetAdsSuccesfull,
        };

        console.log(results);

        return results;

      } catch (err) {
        console.error(err);
      }
    },
    getAdDetail: async (id, token) => {
      console.log('id', id);
      console.log('token', token);
      try {
        const response = await fetch(`${adsApiEndpoint}/${id}?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          // credentials: 'include'
        });
        const isGetAdDetailOk = await response.json();

        return isGetAdDetailOk;
      } catch (err) {
        console.error(err);
      }
    },
    filterAd: async (query, value) => {
      switch (value) {
        case 'buy':
          value = false;
          break;
        case 'sell':
          value = true;
          break;
        default:
          break;
      }
      try {
        const response = await fetch(`${adsApiEndpoint}?${query}=${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          // credentials: 'include'
        });
        const isFilterAdOk = await response.json();

        return isFilterAdOk;

      } catch (err) {
        console.error(err);
      }
    },
    createAd: async (name, price, description, tags, type, photo) => {
      try {
        const response = await fetch(`${adsApiEndpoint}`, {
          method: 'POST',
          body: JSON.stringify({
            name: `${name}`,
            price: parseInt(price),
            description: `${description}`,
            tags: tags,
            type: `${type}`,
            photo: `${photo}`
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          // credentials: 'include'
        });
        const isCreateAdOk = await response.json();

        return isCreateAdOk;

      } catch (err) {
        console.error(err);
      }
    },
    editAd: async (id, name, price, description, tags, type, photo) => {
      try {
        const response = await fetch(`${editAdApiEndpoint}${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            name: `${name}`,
            price: parseInt(price),
            description: `${description}`,
            tags: tags,
            type: `${type}`,
            photo: `${photo}`
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          // credentials: 'include'
        });
        const isEditAdOk = await response.json();

        return isEditAdOk;

      } catch (err) {
        console.error(err);
      }
    }


  }
}

export default api;
