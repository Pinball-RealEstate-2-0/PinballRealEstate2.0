const fetch = require('node-fetch');
require('dotenv').config();

// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
// };

exports.handler = async (event, context) => {
  try {
    const response = await fetch(
      `https://us-real-estate.p.rapidapi.com/v2/property-detail?property_id=${event.queryStringParameters.property_id}`,
      {
        headers: {
          'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REAL_ESTATE_KEY,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
