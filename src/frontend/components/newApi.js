   // newsApi.js
   const axios = require('axios');

   const API_KEY = 'your_newsapi_key_here';
   const BASE_URL = 'https://newsapi.org/v2';

   async function fetchSportsNews() {
     try {
       const response = await axios.get(`${BASE_URL}/top-headlines`, {
         params: {
           apiKey: API_KEY,
           category: 'sports',
           country: 'us', // Choose the country code according to your target audience
           pageSize: 10, // Limit the number of results
         },
       });

       return response.data.articles;
     } catch (error) {
       console.error('Error fetching sports news:', error);
       return [];
     }
   }

   module.exports = {
     fetchSportsNews,
   };