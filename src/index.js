import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';

const refs = {
    select: document.querySelector('.js-breed-select'),
    catsInfo: document.querySelector('.js-cat-info'),
    loader: document.querySelector('.js-loader'),
};
const IS_HIDDEN = 'is-hidden';

Notify.init({
    position: 'center-top',
    distance: '70px',
    timeout: 3000,
    cssAnimationStyle: 'zoom',
    fontFamily: 'Arial, sans-serif',
});

refs.select.classList.add(IS_HIDDEN);
refs.catsInfo.classList.add(IS_HIDDEN);

refs.select.addEventListener('change', selectChangeHandler);

showFetchedBreeds();

function selectChangeHandler(event) {
    const selectedCatIndex = event.currentTarget.selectedIndex;
    const selectedId = event.currentTarget[selectedCatIndex].value;

    refs.loader.classList.remove(IS_HIDDEN);
    refs.catsInfo.classList.add(IS_HIDDEN);
    refs.catsInfo.innerHTML = '';

    showFetchedCatBreed(selectedId);
}

function showFetchedBreeds() {
    fetchBreeds()
        .then(breeds => {
            refs.select.insertAdjacentHTML(
                'beforeend',
                createMarkup(breeds.data)
            );

            new SlimSelect({
                select: '#single',
                settings: {
                    placeholderText: 'Select the desired cat'
                },
            });

            refs.loader.classList.add(IS_HIDDEN);
            refs.select.classList.remove(IS_HIDDEN);
        })
        .catch(() => {
            refs.loader.classList.add(IS_HIDDEN);
            Notify.warning('Failed to request data! Choose another breed.');
        });
}

function showFetchedCatBreed(selectedId) {
    fetchCatByBreed(selectedId)
        .then(cat => {
            refs.loader.classList.add(IS_HIDDEN);
            refs.catsInfo.classList.remove(IS_HIDDEN);
            refs.catsInfo.innerHTML = createCatMarkup(cat.data[0]);
        })
        .catch(() => {
            refs.catsInfo.classList.add(IS_HIDDEN);
            Notify.warning('Failed to request data! Choose another breed.');
        });
}

function createCatMarkup({ breeds, url }) {
    const { name, description, temperament } = breeds[0];
    return `
      <img src="${url}" alt="${name}" height="300" class="cat-img">
      <h2 class="cat-name">${name}</h2>
      <p class="cat-description"><span>Description:</span> ${description}</p>
      <p class="cat-temperament"><span>Temperament:</span> ${temperament}</p>
  `;
}

function createMarkup(breeds) {
    return (
        placeholderText + breeds.map(breed => createOptionMarkup(breed)).join('')
    );
}

function createOptionMarkup({ id, name }) {
    return `<option value="${id}">${name}</option>`;
}

function placeholderText() {
    return `<option data-placeholder="true"></option>`;
}