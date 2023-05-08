import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'fb4cadedb4e34d7abfc8b36e9d3539b3';
const BASE_URL = 'https://newsapi.org/v2';

function SportsNews() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
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
        setNewsItems(response.data.articles);
      } catch (error) {
        console.error('Error fetching sports news:', error);
        setNewsItems([]);
      }
    }
    fetchSportsNews();
  }, []);

  return (
    <div>
      <h1>Sports News</h1>
      {newsItems.map((item) => (
        <div key={item.url}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}

export default SportsNews;