import Search from "./model/search";
import {elements, renderLoader, clearLoader} from "./view/base";
import * as searchView from "./view/searchView";

/*
 *Web app status
 * - 検索　クエリ、result
 * - 現在のレシピ
 * - いいね！レシピ
 * - 注文しているレシピの材料
 */

const state = {};

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
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
