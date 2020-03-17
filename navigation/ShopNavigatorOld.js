// Purpose - configure the navigation
// Stack Navigator for Products Overview, Product Detail, Cart, Orders, User Products, Edit Products
// Drawer Navigator for Products, Orders, Admin
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'; // helps make the App more repsonsive to different OS
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '' // from Colors.js
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen, // opening screen
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: { // options for each screen
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AdminNavigator = createStackNavigator(
    {
      UserProducts: UserProductsScreen,
      EditProduct: EditProductScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary // from Colors.js '#C2185B'
    }
  }
);

export default createAppContainer(ShopNavigator);
