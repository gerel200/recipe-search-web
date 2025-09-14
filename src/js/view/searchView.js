import { elements } from "./base";

//private function
const renderRecipe = (recipe) => {
  const markup = `
 <li>
                    <a class="results__link results__link--active" href="#${recipe.id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
  //ul に追加
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  //pageの作成
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  //pageのボタンの作成
  const totalPages = Math.ceil(recipes.length / resPerPage); //ceil, floor
  renderButtons(currentPage, totalPages);
};

//type => 'next', 'prev'
const createButton = (
  page,
  type,
  direction
) => ` <button class="btn-inline results__btn--${type}" data-goto=${page} >
                    <span>Page ${page}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${direction}"></use>
                    </svg>
                </button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;

  if (currentPage === 1 && totalPages > 1) {
    //now 1st page, move to page 2
    buttonHtml = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    //move to previos and next page
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    //now last page, and move to previos page
   buttonHtml = createButton(currentPage - 1, "prev", "left");
  }


  elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
};
