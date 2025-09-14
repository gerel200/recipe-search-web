import { elements } from "./base";


export const renderItem = item => {
  // item.item が存在する場合は、それを取得する
  const data = item.item ?? item; // どちらの形式にも対応できるようにする

  const quantity = data.quantity ?? '';
  const unit = data.unit ?? '';
  const description = data.description ?? '';

  const html = `
    <li class="shopping__item" data-itemid="${item.id}">
      <div class="shopping__count">
        <p>${quantity} ${unit}</p>
      </div>
      <p class="shopping__description">${description}</p>
      <button class="shopping__delete btn-tiny">
        <svg>
          <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
      </button>
    </li>
  `;

  elements.shoppingList.insertAdjacentHTML('beforeend', html);
};


export const clearItems = () => {
    elements.shoppingList.innerHTML = "";
};

export const deleteItem = id => {
    const item =document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
}
