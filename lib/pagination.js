export let articlesPerPage = 9;

export function getPages(numberOfArticles) {//Works out number of pages from number of articles
  //console.log(numberOfArticles);
  //numberOfArticles = 10;
  if (!numberOfArticles || numberOfArticles <= articlesPerPage+1) return 1;
  let pages = Math.floor((numberOfArticles - 2) /articlesPerPage) + 1;
  //console.log(pages);
  return pages;
}