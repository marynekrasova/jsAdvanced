"use strict";
const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = "Product", price = 0) => {
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list = []) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join("");
}
// Это потому-что goodsList это масив а элементы массива записаны через запятую и они сразу записываются  в найденый div,
//   чтобы это исправить я добавила метод join
renderGoodsList(goods);
