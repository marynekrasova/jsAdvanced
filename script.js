"use strict";

class GoodsItem {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render() {
    return `<div class="goods-item"><img alt="photo" src="images/${this.img}"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Suit', price: 150, img: 'product2.png'},
      { title: 'Hoodie', price: 50, img: 'product3.png'},
      { title: 'Jacket', price: 350, img: 'product5.png'},
      { title: 'Trousers', price: 250, img: 'product4.png'},
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price, good.img);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  calculateSumm(){
    let summ = 0;
    this.goods.forEach(good => {
      summ += good.price;
    });
    console.log(summ);
  }
}
const list = new GoodsList();
list.fetchGoods();
list.render();
list.calculateSumm();


class BasketItem {
  constructor() {

  }
  render() {

  }
}
class Basket {
  constructor() {

  }
  render (){

  }
  calculateSumm(){

  }
}
