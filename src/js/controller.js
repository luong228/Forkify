import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) module.hot.accept();

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

     // Updating bookmarks view
     bookmarksView.update(model.state.bookmarks);

    // Loading recipe
    await model.loadRecipe(id);
    
    // Rendering recipe
    recipeView.render(model.state.recipe);
    controlServings(5);

    // recipeContainer.insertAdjacentHTML('afterbegin', markup)
  } catch (err) {
    recipeView.renderError(err);
    console.error(err);
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();

    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage());

    // Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = goToPage => {
  try {
    // Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));
    // Render NEW pagination btns
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlServings = (newServings) => {
  try {
      // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view 
  recipeView.update(model.state.recipe);
  } catch (error) {
    console.error(error);
  }

}

const controlAddBookmark = () => {
  // Add/Remove bookmark
  if(!model.state.recipe.bookmarked) 
    model.addBookmark(model.state.recipe);
  else {
    model.removeBookmark(model.state.recipe.id);
  }

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmark = () => {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = (recipe) => {
  console.log(recipe);

  // Upload the new recipe data
}

const clearBookmarks = () => {
  localStorage.clear('bookmarks');
}

// clearBookmarks();

const init = () => {
  // Bookmark must render before recipe
  bookmarksView.addHandlerRender(controlBookmark);

  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();