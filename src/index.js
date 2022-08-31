import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from './fetchCountries.js';


const DEBOUNCE_DELAY = 300;


const searchForm = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch() {
    
    const name = searchForm.value.trim();    
    
    if (name === '') {
        return (countriesList.innerHTML = ''), (countryInfo.innerHTML = '')
      }


    fetchCountries(name)
        .then(countries => {
            countriesList.innerHTML = ''
            countryInfo.innerHTML = ''
            
            if (countries.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.'); 

            } else if (countries.length === 1) {                           
               renderCountryCard(countries)               
                
            } else {               
                renderListCountries(countries)                
            }
        })

        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
        })   
    }


function renderListCountries(countries) {
    const markup = countries
    .map(({ name, flags }) => {
       return `
        <li class="country-list__item">
           <img src="${flags.svg}" alt="flag of ${name.official}"  width = 30px>
           <h3 class="country-list__name">${name.official}</h3>
        </li>`
    })
    .join('')

    countriesList.innerHTML =  markup;
} 


function renderCountryCard(countries) {
    
    const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `
            <div class="country-info__header">
                <img src="${flags.svg}" alt="flag of ${name.official}"  width = 50px>
                <h1 class="country-info__name">${name.official}</h1>  
            </div>                  
            <p class="country-info__item"><b>Capital: </b>${capital}</p>
            <p class="country-info__item"><b>Population: </b>${population}</p>
            <p class="country-info__item"><b>Languages: </b>${Object.values(languages).join(', ')}</p>      
            `
    })    
    countryInfo.innerHTML =  markup;
}

