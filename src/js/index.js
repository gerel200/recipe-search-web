import Search from "./model/search";
import {elements, renderLoader, clearLoader} from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import {renderRecipe, clearRecipe} from './view/recipeView';
import List from './model/List';
import * as listView from './view/listView';
import Like from './model/Like';
import * as likesView from './view/likesView';


/*
 *Web app status
 * - 検索　クエリ、result
 * - 現在のレシピ
 * - いいね！レシピ
 * - 注文しているレシピの材料
 */

const state = {};
//close like menu

//search controller
const controlSearch = async () => {
  //1. web から search のキーワードを取得
  const query = searchView.getInput();

  if (query) {
    //2.　新しい検索objectを作成
    state.search = new Search(query);

    //3. 検索のため、スクリーンのUIを準備する
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    //4. 検索
    await state.search.doSearch();

    //5. 検索の結果をスクリーンに見せる
    clearLoader();
    if(state.search.result === undefined) alert("Not found...")
    else searchView.renderRecipes(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");

  if(btn){
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});


//recipe controller
const controlRecipe = async () => {
  //１．url からID を取得
  const id = window.location.hash.replace('#', '');
  
  // URL にID あるか調べる
  if(id){
  //２．recipe　modelの作成
  state.recipe = new Recipe(id);
  //３．UIスクリーンの準備
  clearRecipe();
  renderLoader(elements.recipeDiv);
  // highlightSelectedRecipe(id);
  //４．サイトにAPIを導入
  await state.recipe.getRecipe();
  //５．レシピの調理時間と材料の計算する
  clearLoader();
  state.recipe.calcTime();
  state.recipe.calcHuniiToo();
  //６．レシピをスクリーンに見せる
  renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe));
window.addEventListener('load', e => {
  //アプリに読み込んだ直後に新しい「いいね」モジュールを作成します。
  if(!state.likes) state.likes = new Like();
  //いいねがある場合は、それらをメニューに追加して表示します
  state.likes.likes.forEach(like => likesView.renderLike(like));
});

//ingredients controller 
const controlList = () => {
  //1. ingredient model の作成
  state.list = new List();
  //前に表示された材料を画面から削除する
  listView.clearItems();
  //2. このmodelに現在の材料を取得
  state.recipe.ingredients.forEach( n => {
    const item =  state.list.addItem(n);
    // 材料を画面に見せる
    listView.renderItem(item);
  });
};

//like control 
const controlLike = () => {
  //1. Likeのモデルの作成
  if(!state.likes) state.likes = new Like();
  //2. LikeされたかIDを取得
  const currentRecipeId = state.recipe.id;
  //3. Likeされたか確認
  if(state.likes.isLiked(currentRecipeId)){
    //4. Likeを押したら取り消す
    state.likes.deleteLike(currentRecipeId);
    //「いいね」メニューから削除する。
    likesView.deleteLike(currentRecipeId);
    likesView.toggleLikeBtn(false);
  } else {
    //5. Likeされてないとき、Likeにする
    const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher,  state.recipe.image_url);
    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
  }
};


elements.recipeDiv.addEventListener('click', e => {
  if(e.target.matches('.recipe__btn, .recipe__btn *')){
    controlList();
  } else if(e.target.matches('.recipe__love, .recipe__love *')){
    controlLike();
  }
});

elements.shoppingList.addEventListener('click', e => {
  //クリックされた<li>要素の data-itemid 属性を取得する
  const id = e.target.closest(".shopping__item").dataset.itemid;
  
  //見つかったIDを持つ材料をモデルから削除する
  state.list.deleteItem(id);

  //このIDを持つ材料を画面から探して削除する
  listView.deleteItem(id);
});
