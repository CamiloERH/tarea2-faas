var axios = require('axios');

exports.handler = async (event) => {
    try {
        let res;
        
        res = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather?q=santiago,cl', {
            headers: { 
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com', 
            'x-rapidapi-key': '11a79c540cmsh61db7ed289d61edp193df7jsn7a7c01afb76b'
          }
        });
        
        let temp = parseInt(res.data.main.temp);
        temp = temp - 273.15;
        
        res = await axios.get('http://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=a37fe292eb8548edd99dfc7f9cf9b43d25581ca6&formato=json');
        let uf = res.data["UFs"][0]["Valor"];
        
        res = await axios.get('http://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=a37fe292eb8548edd99dfc7f9cf9b43d25581ca6&formato=json');
        let dolar = res.data["Dolares"][0]["Valor"];
        
        let crucigrama = 'https://isbooth.com/cross.php?lg=es';
        
        return {
            statusCode: 200,
            body: JSON.stringify({temp, uf, dolar, crucigrama})
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 400,
            body: JSON.stringify("NOOO")
        };
    }
};