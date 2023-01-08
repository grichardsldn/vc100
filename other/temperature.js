'use strict';

import fetch from 'node-fetch';

const POS_X = 20;
const POS_Y = 12;

const VC100_URL = 'http://starbug1.local:1664';

// export type Type = 'NORMAL' | 'BIG'

// export type Message = {
//   msg: string,
//   row: number,
//   col?: number,
//   len?: number,
//   style?: Type,
//   colour?: string,
// }


export const postMessage = async (id, msg, address = VC100_URL) => {
  const cmd = `${address}/id/${id}?` + new URLSearchParams(msg)
  await fetch(cmd)
  return true
}

const token = "your-token-here";


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
    const temperature = today[today.length - 1].T;
    const location = response.SiteRep.DV.Location.name;
    return {location, temperature, units};
  } catch (error) {
    console.log(error);
  }
}

const run = async () => {
  console.log(await tempNow(process.env.API_KEY,3672));
  const { location, temperature, units } = await tempNow(process.env.API_KEY,3672);
  console.log({location, temperature, units});
  await postMessage('temp-location', {
    msg: 'TEMP',
    row: POS_Y,
    col: POS_X,
    len: 10,
    style: 'NORMAL',
    colour: 'white'
  });
  await postMessage('temp-value', {
    msg: `${temperature}c`,
    row: POS_Y+1,
    col: POS_X,
    len: 10,
    style: 'BIG',
    colour: 'white'
  });
};

run();
