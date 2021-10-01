"use strict";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const cartButton = document.querySelector('.cart-button');
const searchButton = document.querySelector('.search-button');
let searchInput = document.querySelector('.goods-search');
searchButton.addEventListener('click', (e) => {
  const value = searchInput.value;
  list.filterGoods(value);
});

class GoodsItem {
  constructor(product_name, price, img) {
    this.product_name = product_name;
    this.price = price;
    this.img = img;
  }
  render() {
    return `<div class="goods-item"><img alt="photo" src="images/${this.img}"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }
  // fetchGoods() {
  //   this.goods = [
  //     { product_name: 'Suit', price: 150, img: 'product2.png'},
  //     { product_name: 'Hoodie', price: 50, img: 'product3.png'},
  //     { product_name: 'Jacket', price: 350, img: 'product5.png'},
  //     { product_name: 'Trousers', price: 250, img: 'product4.png'},
  //   ];
  // }
  async fetchGoods() {
    return await fetch(`${API_URL}/catalogData.json`).then(resp => resp.json());
  }
  render() {
    let listHtml = '';
      this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.product_name, good.price, good.img);
        listHtml += goodItem.render();
      });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  renderFilter () {
    let listHtml = '';
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.img);
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
  filterGoods(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    this.renderFilter();
  }
}

const makeGETRequest = (url) => {
 return new Promise((resolve, reject) => {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      resolve(JSON.parse(xhr.response));
    }
  }

  xhr.onerror = function (error) {
    reject(error);
  }

  xhr.open('GET', url, true);
  xhr.send();
 });
}

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
  add (){

}
  delete (){

}
  calculateSumm(){

  }
}
const list = new GoodsList();
const promise = list.fetchGoods();
promise.then(goods => {
  list.goods = goods;
  list.render();
  list.calculateSumm();
}).catch(error => {
  console.error(error.response);
});

//Решение Задания 4
let regexp = /^'|(\s)'|'(\s)|'$/g;
let str = "Mr 'Blue has' a blue aren't house and a blue car";
 let strAfter = str.replace(regexp, '$1"$2');
 console.log (strAfter);
//
