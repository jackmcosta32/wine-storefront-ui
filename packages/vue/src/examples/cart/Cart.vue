<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      title="My Cart"
      class="sf-sidebar--right sf-sidebar--icon"
      @close="() => {}"
    >
      <template #content-top>
        <SfProperty
          class="sf-property--large cart-summary desktop-only"
          name="Total items"
          :value="totalItems"
        />
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <SfCollectedProduct
                v-for="product in products"
                :key="product.id"
                v-model="product.qty"
                :image="product.image"
                :title="product.title"
                :regular-price="product.price.regular"
                :special-price="product.price.special"
                class="collected-product"
                @click:remove="removeHandler(product)"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(property, key) in product.configuration"
                      :key="key"
                      :name="property.name"
                      :value="property.value"
                    />
                  </div>
                </template>
                <template #actions>
                  <div class="desktop-only collected-product__actions">
                    <SfButton class="sf-button--text collected-product__save">
                      Save for later
                    </SfButton>
                    <SfButton
                      class="sf-button--text collected-product__compare"
                    >
                      Add to compare
                    </SfButton>
                  </div>
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <SfProperty
              name="Total price"
              class="
                sf-property--full-width sf-property--large
                my-cart__total-price
              "
            >
              <template #value>
                <SfPrice :regular="totalPrice" />
              </template>
            </SfProperty>
            <SfButton class="sf-button--full-width color-secondary"
              >Go to checkout</SfButton
            >
          </div>
          <div v-else>
            <SfButton class="sf-button--full-width color-primary"
              >Go back shopping</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfHeading,
  SfProperty,
  SfPrice,
  SfImage,
  SfCollectedProduct,
} from "@storefront-ui/vue"
export default {
  name: "Cart",
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfImage,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
  },
  data() {
    return {
      isCartSidebarOpen: true,
      products: [
        {
          title: "Cream Beach Bag Modern Style",
          id: "CBB1",
          image: "assets/storybook/Home/productA.jpg",
          price: { regular: "$50.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "White" },
          ],
          qty: "1",
        },
        {
          title: "Cream Beach Bag Modern Style",
          id: "CBB2",
          image: "assets/storybook/Home/productB.jpg",
          price: { regular: "$50.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "White" },
          ],
          qty: "2",
        },
        {
          title: "Cream Beach Bag Modern Style",
          id: "CBB3",
          image: "assets/storybook/Home/productC.jpg",
          price: { regular: "$50.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "White" },
          ],
          qty: "1",
        },
      ],
    }
  },
  computed: {
    totalItems() {
      return this.products.reduce(
        (totalItems, product) => totalItems + parseInt(product.qty, 10),
        0
      )
    },
    totalPrice() {
      return this.products
        .reduce((totalPrice, product) => {
          const price = product.price.special
            ? product.price.special.replace("$", "")
            : product.price.regular.replace("$", "")
          const summary = parseFloat(price).toFixed(2) * product.qty
          return totalPrice + summary
        }, 0)
        .toFixed(2)
    },
  },
  methods: {
    removeHandler(product) {
      const products = [...this.products]
      this.products = products.filter((element) => element.id !== product.id)
    },
  },
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#cart {
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
.cart-summary {
  margin-top: var(--spacer-xl);
}

.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 13.1875rem;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      --image-width: 23.3125rem;
      margin: 0 0 var(--spacer-2xl) 0;
    }
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
</style>

<include-source />
