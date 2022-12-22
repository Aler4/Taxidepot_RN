import {FC} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

interface IProps {
  size?: 'large' | 'small' | number | undefined;
}

export const LoadView: FC<IProps> = props => {
  let indicatorSize = props.size || 'large';
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={indicatorSize} color={'#14e0e0'} />
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
