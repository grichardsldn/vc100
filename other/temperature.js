
const token = "your-token-here";

import fetch from 'node-fetch';


const tempNow = async (apiKep, locationId) => {
  try {
    const url = `http://datapoint.metoffice.gov.uk/public/data/val/wxobs/all/json/${locationId}?res=hourly&key=${apiKep}`;
    console.log(`${url}`);
    const fetchResponse = await fetch(url, {
      headers: {'Content-Type': 'application/json'}
    });
    const response = await fetchResponse.json();
    const today = response.SiteRep.DV.Location.Period[1].Rep;
    const units = response.SiteRep.Wx.Param.find(p => p.name === 'T').units
    const temp = today[today.length - 1].T;
    const location = response.SiteRep.DV.Location.name;
    return `${location} ${temp} ${units}`;
  } catch (error) {
    console.log(error);
  }
}

const run = async () => {
  const summary = await tempNow(process.env.API_KEY,3672);
  console.log(summary);
  fetch(`http://starbug1.local:1664/line/10?msg=${encodeURIComponent(' ' + summary)}`)
};

run();
