"use strict";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    basketGoods: [],
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









