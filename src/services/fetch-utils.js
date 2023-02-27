export async function getAllHomes(state_code, city, zip_code, price_max, price_min) {
  try {
    const response = await fetch(
      `https://us-real-estate.p.rapidapi.com/v2/for-sale?limit=20&state_code=${state_code}&city=${city}&location=${zip_code}&price_min=${price_min}&price_max=${price_max}`,
      {
        headers: {
          'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
          'X-RapidAPI-Key': '2267bfc3f6mshc7ab2de9afac30bp1e4ce6jsn09240aaa0016',
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}

// export async function getPinballMachines(query) {
//   //eslint-disable-line
//   const response = await fetch();
//   const data = await response.json();

//   return data;
// }

export async function geoCode(zip_code) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${zip_code}.json?country=US&limit=1&types=postcode&access_token=pk.eyJ1IjoiYmVsbGlvdHQxNSIsImEiOiJjbGVuOTRsajEwY3dmM3ZwNmZ1NW5qdmc4In0.2ZL23EsquT5qYFF4dNHQOA`
  );
  const data = await response.json();
  return data;
}

export async function getSingleHome(property_id) {
  try {
    const response = await fetch(
      `https://us-real-estate.p.rapidapi.com/v2/property-detail?property_id=${property_id}`,
      {
        headers: {
          'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
          'X-RapidAPI-Key': '2267bfc3f6mshc7ab2de9afac30bp1e4ce6jsn09240aaa0016',
        },
      }
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}
