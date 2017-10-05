import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Item from './Item'

export default class App extends React.Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.order}>
        <Text>Ref: {this.props.val.ref}</Text>
        <Text>Date: {this.props.val.date}</Text>
        <FlatList
          data={this.props.val.items}
          renderItem={({item}) =>
            <View key={item.key} style={{flexDirection: 'column'}}>
              <Text>Description: {item.description}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: {item.price}</Text>
              <Text style={{alignSelf: 'flex-end'}}>Total: {item.total}</Text>
            </View>
          }
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  order: {
    position: 'relative',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ebebeb'
  }
});
