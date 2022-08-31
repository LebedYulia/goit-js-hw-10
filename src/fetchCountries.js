
const BASE_URL = `https://restcountries.com/v3.1`;
const options = `fields=name,capital,population,flags,languages`;


export function fetchCountries(name) { 

    const url = `https://restcountries.com/v3.1/name/${name}?${options}`;
    
    return fetch(url)
    .then(respons => {
        return respons.json()
    })    
    .catch(error => {
        console.log(error)
    })
}

