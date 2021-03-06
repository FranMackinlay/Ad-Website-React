// const api = (API_URL = 'http://3.19.218.251') => {
const api = (API_URL = 'http://ec2-3-19-218-251.us-east-2.compute.amazonaws.com') => {
  const registerApiEndpoint = `${API_URL}/api/users`;
  const loginApiEndpoint = `${API_URL}/api/authenticate`;
  const adsListApiEndpoint = `${API_URL}/api/adsList`;
  const adsApiEndpoint = `${API_URL}/api/ads`;
  const editAdApiEndpoint = `${API_URL}/api/ads/`;
  return {
    register: async (email, password) => {
      try {
        const response = await fetch(`${registerApiEndpoint}`, {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
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

        return isLoginSuccesfull;

      } catch (err) {
        console.error(err);
      }
    },
    getAds: async () => {
      try {
        const response = await fetch(`${adsListApiEndpoint}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          },
          // // credentials: 'include'
        });
        const isGetAdsSuccesfull = await response.json();

        const { adList } = isGetAdsSuccesfull;
        return adList;

      } catch (err) {
        console.error(err);
      }
    },
    getAdDetail: async ({ id, token }) => {
      try {
        const response = await fetch(`${adsListApiEndpoint}/${id}?token=${token}`, {
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
      try {
        const response = await fetch(`${adsListApiEndpoint}?${query}=${value}`, {
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
    createAd: async (adName, price, description, tags, type, photo, author, token) => {
      try {
        const formData = new FormData();
        formData.append('price', parseInt(price));
        formData.append('adName', adName);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('type', type);
        formData.append('photo', photo);
        formData.append('author', author);
        formData.append('token', token);

        const response = await fetch(`${adsApiEndpoint}?token=${token}`, {
          method: 'POST',
          body: formData,
          // query: {
          //   token
          // },
          // headers: {
          //   'Content-Type': 'application/json',
          // },
        });
        const isCreateAdOk = await response.json();

        return isCreateAdOk;

      } catch (err) {
        console.error(err);
      }
    },
    editAd: async ({ id, token, name, price, description, tags, type, photo }) => {
      try {
        const formData = new FormData();
        formData.append('price', parseInt(price));
        formData.append('adName', name);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('type', type);
        formData.append('photo', photo);
        formData.append('token', token);
        const response = await fetch(`${editAdApiEndpoint}${id}?token=${token}`, {
          method: 'PUT',
          body: formData,
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          // credentials: 'include'
        });
        const isEditAdOk = await response.json();
        return isEditAdOk;

      } catch (err) {
        console.error(err);
      }
    },
    deleteAd: async ({ id, token }) => {
      try {
        const response = await fetch(`${adsApiEndpoint}/${id}?token=${token}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const isDeleteOk = await response.json();

        return isDeleteOk;

      } catch (error) {
        console.error(error);
      }
    },
    getUser: async email => {
      try {
        const response = await fetch(`${registerApiEndpoint}?email=${email}`, {
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
    getUserAds: async (token, email) => {
      try {
        const response = await fetch(`${adsApiEndpoint}?token=${token}&email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const isGetUserAdsOk = await response.json();

        return isGetUserAdsOk;
      } catch (error) {

      }
    }


  }
}

export default api;
