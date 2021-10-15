"use strict";
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
    makePOSTRequest(url, data) {
      return new Promise((resolve, reject) => {
      let xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log('1');
          resolve(JSON.parse(xhr.response));
        }
      }
        xhr.onerror = function (error) {
          reject(error);
        }

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      // debugger;
      xhr.send(data);
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

    addProduct(good) {
      const promise = this.makePOSTRequest('/addToCart', JSON.stringify(good));
      promise.then(
        goods => {
          this.basketGoods = goods;
            // let productId = good.id;
            // let count = 0;
            // if (this.basketGoods.length !== 0) {
            //   this.basketGoods.forEach(arr => {
            //     if(arr.id === productId){
            //       arr.count = arr.count + 1;
            //       arr.summBasket = arr.price * arr.count;
            //     } else {
            //       good.count = count + 1;
            //       good.summBasket = good.price * good.count;
            //       this.basketGoods.push(good);
            //     }
            //   });
            // }else {
            //   good.count = count + 1;
            //   good.summBasket = good.price * good.count;
            //   console.log("add");
            //   this.basketGoods.push(good);
            // }
            // this.calculateSumm();
        }).catch(error => {
          console.error(error.response);
        });
    },
    removeFromCart(index) {
      this.basketGoods = [...this.basketGoods.slice(0, index), ...this.basketGoods.slice(index+1)];
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
    const promise = this.makeGETRequest('/catalog');
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









