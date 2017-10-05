import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.items}>
          <View key={this.props.keyval} style={styles.row}>
            <View style={styles.spaceBetween}>
              <Text>{this.props.val.id}</Text>
              <Text>{this.props.val.quantity}</Text>
              <Text>{this.props.val.price}</Text>
              <Text>{this.props.val.total}</Text>
            </View>
          </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Description: {this.props.val.description}</Text>
        </View>
        <Button
          color='black'
          onPress={this.props.delete}
          title='Remove item'
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
