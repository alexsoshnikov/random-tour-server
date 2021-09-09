const GooglePlaces = require('googleplaces')
const axios = require("axios");
const googlePlaces = new GooglePlaces(process.env.GOOGLE_API_KEY, 'json');

module.exports = class PlacesService {
    static async getPlacesOfInterest() {
        const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${process.env.GOOGLE_API_KEY}`
        }
        const response = await axios(config)

        console.log(response)
    }
}
