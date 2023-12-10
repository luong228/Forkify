import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'

if (module.hot) module.hot.accept();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    
    recipeView.renderSpinner();
    
    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

      // recipeContainer.insertAdjacentHTML('afterbegin', markup)
  } catch (err) {
    recipeView.renderError(err)
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();

    if(!query) return;

    // Load search results
    await model.loadSearchResults(query)

    // Render
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
}

const init = () => {
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults);
}

init();
