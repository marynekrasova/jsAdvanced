"use strict";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
  `
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
     <button class="cart-button" type="button" @click="addProduct(good)">Добавить</button>
    </div>
  `
});

Vue.component('basket-list', {
  props: ['basketGoods', 'allSumm'],
  template: `
        <div>
        <table class="header-basket">
        <tr>
            <th>Наименование</th><th>Стоимость</th><th>Штук</th><th>Сумма</th>
        </tr>
        </table>
        <basket-item v-for="good in basketGoods" class="basket-table"></basket-item>
            <div class="basket-summ">Товаров в корзине на сумму:{{ allSumm }}</div>
        </div>
  `
});
Vue.component('basket-item', {
  props: ['good'],
  template: `
         <tr>
            <td>{{ good.product_name }}</td><td>{{ good.price }}</td><td>{{ good.count }}</td><td>{{ good.summBasket }}</td>
         </tr>
  `
});

Vue.component('forma', {
  props: ['goods', 'searchLine'],
  template: `
    <form >
        <input type="text" id="search"  class="goods-search" v-model="searchLine">
        <input type="submit" class="search-button" value="Искать" id="submit" @click="filterGoods()">
    </form>
  `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    basketGoods: [

        // {
        //   "id_product": 123,
        //   "product_name": "Ноутбук",
        //   "price": 45600,
        //   "count": 1
        // },
        // {
        //   "id_product": 456,
        //   "product_name": "Мышка",
        //   "price": 1000,
        //   "count": 1
        // }

    ],
    searchLine: '',
    isVisibleCart: 'none',
    allSumm: 0
  },
  methods: {
    makeGETRequest(url)  {
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
    },

    calculateSumm(){
      let summ = 0;
      this.basketGoods.forEach(good => {
        summ += good.price*good.count;
        this.allSumm = summ;
      });
    },

    filterGoods() {
      let text = this.searchLine.toLowerCase().trim();
      if (text === '') {
        this.filteredGoods = this.goods;
      } else {
        this.filteredGoods = this.goods.filter((el) => {
          return el.product_name.toLowerCase().includes(text);
        });
      }
    },

    addProduct (good) {
      let productId = good.id_product;
      let count = 0;
      if (this.basketGoods.length !== 0) {
        this.basketGoods.forEach(arr => {
          if(arr.id_product === productId){
            arr.count = arr.count + 1;
            arr.summBasket = arr.price * arr.count;
          } else {
            good.count = count + 1;
            good.summBasket = good.price * good.count;
            this.basketGoods.push(good);
          }
        });
      }else {
        good.count = count + 1;
        good.summBasket = good.price * good.count;
        console.log("add");
        this.basketGoods.push(good);
      }
      this.calculateSumm();
    },

    openBasket() {
      if (this.isVisibleCart === "none"){
        this.isVisibleCart = "block";
      } else {
        this.isVisibleCart = "none";
      }
      this.calculateSumm();
    }

  },

  mounted() {
    const promise = this.makeGETRequest(`${API_URL}/catalogData.json`);
    promise
    .then(
      goods => {
        this.goods = goods;
        this.filteredGoods = goods;
    }).catch(error => {
     console.error(error.response);
    });
  }
});









