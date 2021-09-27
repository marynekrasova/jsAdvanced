"use strict";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
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
  }
  // fetchGoods() {
  //   this.goods = [
  //     { product_name: 'Suit', price: 150, img: 'product2.png'},
  //     { product_name: 'Hoodie', price: 50, img: 'product3.png'},
  //     { product_name: 'Jacket', price: 350, img: 'product5.png'},
  //     { product_name: 'Trousers', price: 250, img: 'product4.png'},
  //   ];
  // }
  fetchGoods() {
    return new Promise((resolve, reject) => {
      makeGETRequest(`${API_URL}/catalogData.json`, (response) => {
        if(response.status >= 200 && response.status < 300) {
          resolve(JSON.parse(response.responseText));
        } else {
          reject({
            response: response.responseText,
            status: response.status
          });
        }
      })
    })
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
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
}


function makeGETRequest(url, callback) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // callback(xhr.responseText);
      callback(xhr);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
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

