function listOfCountries() {
    const countriesList = document.querySelector('.countries-list');
    const input = document.querySelector('.search');

    function loader() {
        countriesList.innerHTML = `<div class="loader"></div>`;
    }

    function hideLoader() {
        countriesList.innerHTML = '';
    }

    function htmlCountriesTemplate(array) {
        array.forEach(country => {
            countriesList.innerHTML += `
            <ul class="country-wrapper">
                <img src="${country.flags.png}">
                <li>${country.name}</li>
                <li><span>Population:</span> ${country.population.toLocaleString() ?? '-'}</li>
                <li><span>Region:</span> ${country.region ?? '-'}</li>
                <li><span>Capital:</span> ${country.capital ?? '-'}</li>
            </ul>
            `;
        });
    }

    function selectRegion() {
        const select = document.querySelectorAll('.select');

        if (!!select) {
            select.forEach(option => {
                option.addEventListener('change', () => {
                    switch (option.value) {
                        case 'africa':
                            filterByRegion('africa');
                            break;
                        case 'america':
                            filterByRegion('americas');
                            break;
                        case 'asia':
                            filterByRegion('asia');
                            break;
                        case 'europe':
                            filterByRegion('europe');
                            break;
                        case 'oceania':
                            filterByRegion('oceania');
                            break;
                    }
                });
            });
        }
    }

    selectRegion();

    function enterSearchCountryByName() {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.length > 1) {
                e.preventDefault();
                searchCountryByName(input.value);
            }
        });
    }

    enterSearchCountryByName();

    function darkMode() {
        const darkMode = document.querySelectorAll('.dark-mode-button');

        if (!!darkMode) {
            darkMode.forEach(mode => {
                mode.addEventListener('click', () => {
                    document.body.classList.toggle('dark-body-theme');

                    if (document.body.classList.contains('dark-body-theme')) {
                        if (document.querySelectorAll('.country-wrapper')) {
                            const countryWrapper = document.querySelectorAll('.country-wrapper');
    
                            countryWrapper.forEach(item => {
                                item.classList.add('dark-mode-country-wrapper-styles');
                            });   
                        }
                    } else {
                        if (document.querySelectorAll('.country-wrapper')) {
                            const countryWrapper = document.querySelectorAll('.country-wrapper');
    
                            countryWrapper.forEach(item => {
                                item.classList.remove('dark-mode-country-wrapper-styles');
                            });   
                        }
                    }
                });
            });
        }
    }

    darkMode();

    //fetch
    function showAllCountries() {
        const url = 'https://restcountries.com/v2/all';

        loader();

        let fetchCountries = [];
        async function handleFetchRequest(url) {
            try {
                const response = await fetch(url);

                fetchCountries = await response.json();

                hideLoader();
            } catch (error) {
                return [];
            }
        }

        const htmlAllCountriesTemplate = async () => {
            await handleFetchRequest(url);

            htmlCountriesTemplate(fetchCountries);
        };

        htmlAllCountriesTemplate();
    }

    showAllCountries();

    function searchCountryByName(name) {
        const url = `https://restcountries.com/v2/name/${name}`;

        let fetchSearch = [];
        async function handleFetchRequest(url) {
            try {
                const response = await fetch(url);

                fetchSearch = await response.json();
            } catch (error) {
                return [];
            }
        }

        const htmlCountrySearchTemplate = async () => {

            await handleFetchRequest(url);

            countriesList.replaceChildren();

            htmlCountriesTemplate(fetchSearch);
        };

        htmlCountrySearchTemplate();
    }

    function filterByRegion(region) {
        const url = `https://restcountries.com/v2/region/${region}`;

        let fetchCountriesByRegion = [];
        async function handleFetchRequest(url) {
            try {
                const response = await fetch(url);

                fetchCountriesByRegion = await response.json();
            } catch (error) {
                return [];
            }
        }

        const htmlCountriesByRegion = async () => {
            await handleFetchRequest(url);

            countriesList.replaceChildren();

            htmlCountriesTemplate(fetchCountriesByRegion);
        };

        htmlCountriesByRegion();
    }
}

document.addEventListener('DOMContentLoaded', listOfCountries);