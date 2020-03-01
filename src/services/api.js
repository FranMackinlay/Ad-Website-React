const api = (API_URL = 'http://34.89.93.186:8080') => {
  const registerApiEndpoint = `${API_URL}/apiv1/register`;
  const loginApiEndpoint = `${API_URL}/apiv1/login`;
  const adsApiEndpoint = `${API_URL}/apiv1/anuncios`;
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
          credentials: 'include'
        })

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
            username: `${username}`,
            password: `${password}`
          }),
          headers: {
            'Content-type': 'application/json'
          },
          credentials: 'include'
        });


        const isLoginSuccesfull = await response.json();


        return isLoginSuccesfull;


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

        return isGetAdsSuccesfull;

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

        return isGetAdDetailOk;
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

        return isFilterAdOk;

      } catch (err) {
        console.error(err);
      }
    },
    createAd: async (name, price, description, tags, type, photo) => {
      try {
        console.log(name, price, description, tags, type, photo);
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
          credentials: 'include'
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
          credentials: 'include'
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
