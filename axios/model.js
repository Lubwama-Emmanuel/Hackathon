const axios = require("axios");

exports.getResult = async ({ ph, pCO2, HCO3, age, sex }) => {
    try {
        const requestUrl = `https://copd-prediction-modal-uia.herokuapp.com/copd-prediction/${ph},${pCO2},${HCO3},${age},${sex}`;
   
        const result = await axios.get(requestUrl)
        return result.data;
    } catch (err) {
        console.log("ERROR", err)
    }
} 