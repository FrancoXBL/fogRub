import { editData } from "./editData";

export const calculateTotal = (items, setSendSale) => {
  const total = items.reduce((acc, item) => acc + item.totalPrice, 0);
  setSendSale((prev) => ({ ...prev, total: total.toString() }));
};

export const reduceStock = (articleList, ticketItems, setArticleList) => {
  const updatedArticles = articleList.map((article) => {
    const soldItem = ticketItems.find((item) => item.name === article.name);
    if (soldItem) {
      const newData = {
        ...article,
        stock: parseInt(article.stock) - parseInt(soldItem.quantity),
      };
      editData("articles-list", newData);
    }
    return article;
  });
  setArticleList(updatedArticles);
};
