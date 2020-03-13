// Purpose - opening screen that shows all of the products for sale
import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'; // see line 51
import Colors from '../../constants/Colors';

// Props are short for Properties. The simple rule of thumb is props should not be changed
// Components receive props from their parent. These props should not be modified inside the component. In React and React Native the data flows in one direction -> From the parent to the child.
const ProductsOverviewScreen = props => {
  // get the available products from the products reducer
  const products = useSelector(state => state.products.availableProducts); // from Products reducer
  const dispatch = useDispatch();

  // setup the navigation to the ProductDetail screen on line 37
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id, // pass this
      productTitle: title
    });
  };

  return (
    <FlatList
      data={products} // line 16
      keyExtractor={item => item.id} // unique key
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title); // see line 20 above, go to ProductDetail screen
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item)); // adds item to the cart
            }} // dispatch uses addToCart function in cart.js in actions folder
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
