// import libraries for making a Component
import React from 'react';
import { Text, View } from 'react-native';

// make component
const Header = (props) => {
  const { viewStyle, textStyle } = styles;
  return (
    <View
      style={viewStyle}
      backgroundColor={props.headerBackgroundColor}
    >
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};


const styles = {
  viewStyle: {
    backgroundColor: '#c6e2ff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
  //  shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.2,
    //elevation: 2,
    //relative:
  },
  textStyle: {
    fontSize: 20
  }
};

// make component available to other parts of the App
export { Header };
