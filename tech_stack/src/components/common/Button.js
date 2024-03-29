import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const Button = ({ onPress, text }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    //alignItems: 'space-around',
    height: 50,
    backgroundColor: '#808080',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export { Button };
