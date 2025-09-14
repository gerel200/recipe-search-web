import { elements } from "./base";

const renderElement = material => {
  if (!material) return ''; // null эсвэл undefined бол хоосон буцаана

  const quantity = material.quantity ?? '';
  const unit = material.unit ?? '';
  const description = material.description ?? '';

  return `
    <li class="recipe__item">
      <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__ingredient">
        ${quantity} ${unit} ${description}
      </div>
    </li>
  `;
};




export const clearRecipe = () => {
  // 現在画面に表示されているレシピを削除する
  elements.recipeDiv.innerHTML = "";
};

export const renderRecipe = (recipe, isLiked) => {
  //このレシピをスクリーンに見せる
  const html = `
              <figure class="recipe__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes </span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.huniiToo}</span>
                    <span class="recipe__info-text"> portion</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>
            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map(el => renderElement(el)).join(' ')}
                </ul>

                <button class="btn-small recipe__btn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>ADD TO CART</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">Cooking instructions</h2>
                <p class="recipe__directions-text">
                    Prepared and submitted the recipe.
                    <span class="recipe__by">${recipe.publisher}</span>. You can find the recipe instructions on our website
                </p>
                <a class="btn-small recipe__btn" href="${recipe.source_url}" target="_blank">
                    <span>View the manual</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>`;

  elements.recipeDiv.insertAdjacentHTML("afterbegin", html);
};
