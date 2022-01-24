const useStaffVersion = false;
const LiveDepartureBoardService = require('ldbs-json');
const token = process.env.API_KEY;

const fetch = require('node-fetch');

// Set up the options for the call
const options = {
  numRows: 2,
  crs:"NSG",
};

const summarise = (s) => {
  return ` P${s.platform} ${s.std} ${s.destination.location.locationName} ${s.etd}`;
};

// Now do the required query
// note that if in an async function you can use await rather that .then
const api = new LiveDepartureBoardService(token, useStaffVersion);


const run = async () => {
  api.call("GetDepBoardWithDetails", options).then(async board => {
    const services = board.GetStationBoardResult.trainServices.service;
    const summaries = services.map(s => summarise(s));
    console.log(JSON.stringify(summaries, null, 2));
    await Promise.all(summaries.map(async (s, n) => {
      return fetch(`http://starbug1.local:1664/line/${n + 5}?msg=${encodeURIComponent(s)}`);
    }));
    console.log(`finished`);
  });
};

run();
