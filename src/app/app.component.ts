import { Component } from '@angular/core';
import { ComponentPool } from '@sedeh/into-pipes';

import { CustomFavoriteComponent } from './formatters/favorite-formatter';
import { CustomCartComponent } from './formatters/cart-formatter';
import { CustomInventoryComponent } from './formatters/inventory-formatter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flexible preview Box';
  events: string[] = [];

  myPreviews= [{
    price: 2.95,
    name: "evil apron pretty",
    catalog_number: 'k24234jh6446',
    description: 'asfasdas s  s as asdas dsad adasd a ad as aas dasda ds',
    inventory: -6,
    images: {
      type: 'image',
      src: {
        small: "https://rlv.zcache.com/create_custom_personalized_bbq_barbecue_gardening_long_apron-r2ef3fadb6fc143078e4983d25bfa1f5d_v9wta_8byvr_140.jpg", 
        large: "https://rlv.zcache.com/create_custom_personalized_bbq_barbecue_gardening_long_apron-r2ef3fadb6fc143078e4983d25bfa1f5d_v9wta_8byvr_140.jpg"
      }
    },
    favorites: false,
    reviews: 3.5,
    cart: 'cart'
  },
  {
    price: 6.35,
    name: "priceless bettyy",
    catalog_number: 'j00000po8768',
    description: 'sdf sfd sdfds  sdf ssd fdfsf sfsd fsd fsdfsf sdfs',
    inventory: 4,
    images: {
      type: 'image',
      src: {
        small: "https://rlv.zcache.com/make_your_own_grill_master_bbq_apron_for_men_beige-r111e4e5082054a6b9c63753ad50ecc27_v9isa_8byvr_140.jpg",
        large: "https://rlv.zcache.com/make_your_own_grill_master_bbq_apron_for_men_beige-r111e4e5082054a6b9c63753ad50ecc27_v9isa_8byvr_140.jpg"
      }
    },
    favorites: false,
    reviews: 1.5,
    cart: 'cart'
  }

  ];
  presentationKeys = [
    {
      key: 'reviews',
      value: 'Reviews',
      hidelabel: true,
      present: true,
      position: 'above',
      side: 'right',
      format: 'rating'
    },
    {
      key: 'favorites',
      value: 'Favorites',
      hidelabel: true,
      present: true,
      spacing: "5",
      position: 'above',
      sidebyside: true,
      side: 'right',
      format:'favorite'
    },
    {
      key: 'cart',
      value: 'Add to cart',
      present: true,
      hidelabel: true,
      spacing: "5",
      position: 'above',
      sidebyside: true,
      side: 'right',
      format:'cart'
    },
    {
      key: 'price',
      value: 'Sale price',
      hidelabel: true,
      emphasize: true,
      present: true,
      position: 'below',
      side: 'center',
      format: 'currency'
    },
    {
      key: 'catalog_number',
      value: 'Item #',
      present: true,
      spacing: "10",
      position: 'below',
      side: 'center'
    },
    {
      key: 'description',
      value: 'Description',
      hidelabel: true,
      present: true,
      spacing: "10",
      position: 'below',
      side: 'left'
    },
    {
      key: 'inventory',
      value: '',
      present: true,
      hidelabel: true,
      spacing: "10",
      position: 'below',
      side: 'right',
      format: 'inventory'
    }
  ]
  config = {
    zoomOnHover: true,
    hovereffect: true,
    width: "250",
    height: "150"
  }

  constructor(private pool:ComponentPool) {
    this.pool.registerComponent("favorite", CustomFavoriteComponent);
    this.pool.registerComponent("cart", CustomCartComponent);
    this.pool.registerComponent("inventory", CustomInventoryComponent);
  }

  onselect(event) {
    this.events.push(event);
  }
}
