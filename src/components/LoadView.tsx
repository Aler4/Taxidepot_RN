import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const LoadView: React.FC = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={'large'} color={'#14e0e0'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
