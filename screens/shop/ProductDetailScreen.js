// Purpose - shows the details for the product that was selected from the ProductsOverviewScreen
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // see line 18, 21, 31 products are stored in redux
// The store in Redux holds all of the application's state.
import Colors from '../../constants/Colors'; // see line 28
import * as cartActions from '../../store/actions/cart'; // see line 31

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId'); // extract product id from parameters received
  const selectedProduct = useSelector(state => // useSelector to select a single product
    state.products.availableProducts.find(eachProduct => eachProduct.id === productId) // find a match
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }} // dispatch uses addToCart function in cart.js in actions folder
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2) /*2 decimals*/}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%', // image will take the full width of screen
    height: 400
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ProductDetailScreen;
