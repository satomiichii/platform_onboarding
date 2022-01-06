// const product = "Socks";
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
  <div class="product">
    <div class="product-image">
      <img :src="image" :alt="altText" />
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{ fee }}</p>
      <productDetails :details="details"></productDetails>
      <div
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{backgroundColor: variant.variantColor}"
        @mouseover="updateProduct(index)"
      ></div>
      <button @click="addToCart" :class="{disabledButton: !inStock}">
        Add to Cart
      </button>
    </div>
    <div class="review">
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews">
        <p>{{ review.name }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>{{ review.review }}</p>
        <p>{{ review.recommend }}</p>
        </li>
      </ul>
    </div>
<review @review-submit="addReview"></review>
  </div>`,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      description: 'This includes two sock.',
      selectedVariant: 0,
      altText: 'A pair of socks',
      link: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
      onSale: true,
      sizes: ['small', 'medium', 'large'],
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green.jpg',
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue.jpg',
          variantQuantity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    saleProduct() {
      return `${this.brand} ${this.product}`;
    },
    fee() {
      if (this.premium) {
        return 'free';
      } else {
        return '$2.99';
      }
    },
  },
});

Vue.component('productDetails', {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>
    `,
});

Vue.component('review', {
  template: `
   <div>
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following error(s)</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        
        <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
            </select>
        </p>
        <p>
            <label for="recommend">Would you recommend this product?</label>        
                <p></p><input v-model="recommend" type="radio" name="yes_no" value="yes" checked>Yes</input></p>
                <p></p><input v-model="recommend" type="radio" value="no" name="yes_no">No</input></p>
        <p>
            <input type="submit" value="Submit">  
        </p>    

    </form>
    </div>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        this.$emit('review-submit', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push('Name required');
        if (!this.review) this.errors.push('Review required');
        if (!this.rating) this.errors.push('Rating required');
        if (!this.recommend) this.errors.push('Recommendation required');
      }
    },
  },
});
const app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: [],
  },
  methods: {
    addCart(id) {
      this.cart.push(id);
    },
  },
});
