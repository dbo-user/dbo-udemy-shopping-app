import React from 'react';
import { Platform, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = (props) => {
 
  //let cartQty = '';
  //const qty = useSelector(state => state.cart.totalQty);
  //qty > 0 ? cartQty = qty : cartQty = ''
    
  return (
  
    <HeaderButton
      {...props}
      
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
    
  );
};

export default CustomHeaderButton;
