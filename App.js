import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Modal, Button, ScrollView, TouchableOpacity } from 'react-native';
import Order from './components/Order';
import Item from './components/Item';
console.disableYellowBox = true;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      modalVisible: false,
      orderArray: [],
      items: [],
      ref: '',
      showForm: false,
      grandTotal: 0,
      orderTotal: 0
    }
  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  toggleItem() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  newOrder() {
    let items = this.state.items.map((val, key) => {
      return <Item key={key} keyval={key} val={val} delete={() => this.deleteItem(key)} />
    })
    const d = new Date();
    return(
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.modal}>
          <View style={{alignSelf:'flex-end'}}>
            <Button
              onPress={() => this.setModalVisible(false)}
              color='black'
              title='X'
            />
          </View>
          <Text style={styles.title}>New Order</Text>
            <View>
              <Text style={styles.sectionLabel}>Order Ref</Text>
              <TextInput
                style={{fontSize: 15}}
                placeholder="Order ref"
                onChangeText={(ref) => this.setState({ref})}
                value={this.state.ref}
              />
            </View>
            <View>
              <Text style={styles.sectionLabel}>Date:</Text>
              <Text>{d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()}</Text>
              <Text style={styles.sectionLabel}>Items:</Text>
              <View style={{alignSelf: 'flex-end', marginTop: -20}}>
                <TouchableOpacity
                  onPress={() => this.toggleItem()}
                >
                  <Text style={{fontSize:30, marginBottom: 20}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.orderHeader}>

              <View style={styles.spaceBetween}>
                <Text>No:</Text>
                <Text>Quantity:</Text>
                <Text>Price:</Text>
                <Text>Total:</Text>
              </View>
            </View>
            <ScrollView style={styles.scrollviewItems}>
              {items}
            </ScrollView>
            {this.showItemForm()}
            <Button
              onPress={this.addOrder.bind(this)}
              color='black'
              title='Add Order'
              disabled={this.state.ref === '' || this.state.showForm}
            />
          </View>
        </Modal>
    )
  }

  showItemForm() {
    if(this.state.showForm){
    return(
      <View style={styles.section}>
        <View style={{alignSelf:'flex-end'}}>
          <Button
            onPress={() => this.toggleItem()}
            color='black'
            title='X'
          />
        </View>
        <Text style={styles.itemLabel}>Item number</Text>
        <TextInput
          style={styles.itemInput}
          placeholder="Item no"
          onChangeText={(id) => this.setState({id})}
          value={this.state.id}
        />
        <Text style={styles.itemLabel}>Item description</Text>
        <TextInput
          style={styles.itemInput}
          placeholder="Item description"
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />
        <Text style={styles.itemLabel}>Quantity</Text>
        <TextInput
          style={styles.itemInput}
          placeholder="Quantity"
          keyboardType = 'numeric'
          onChangeText={(quantity) => this.setState({quantity})}
          value={this.state.quantity}
        />
        <Text style={styles.itemLabel}>Item price</Text>
        <TextInput
          style={styles.itemInput}
          placeholder="Price"
          keyboardType = 'numeric'
          onChangeText={(price) => this.setState({price})}
          value={this.state.price}
        />
        <Button
          color='black'
          title='Save Item'
          onPress={() => this.addItem()}
          disabled={this.isNotNumeric(this.state.quantity) || this.isNotNumeric(this.state.price)}
        />
      </View>
    )
  } else {
    return(
      <View style={{alignSelf: 'flex-end', marginTop: -30}}>
        <Text style={{fontSize: 20}}>Grand total: {this.state.grandTotal}</Text>
      </View>
    )
  }
  }

  //checks if number is numeric
  //used for price input and quantity
  // returns true if n is not numeric, which disables the save btn
  isNotNumeric(n) {
    return isNaN(parseFloat(n)) && !isFinite(n);
  }

  addOrder() {
    // Add new order to orderArray
    if(this.state.ref) {
      const d = new Date();
      this.state.orderArray.push( {
        'date': d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(),
        'ref': this.state.ref,
        'items': this.state.items || [],
      })
      // Update grand total for all orders
      let orderTotal = this.state.orderTotal
      this.state.items.map((total) => {
        orderTotal += total.total
      })
      // reset data for new entry
      this.setState({
        ref: '',
        items: [],
        total: '',
        grandTotal: 0,
        orderTotal: orderTotal
      })
      // close modal
      this.setModalVisible(false)
    }
  }

  addItem() {
    if(this.state.description && this.state.quantity && this.state.price) {
      this.state.items.push( {
        'id': this.state.id,
        'description': this.state.description || '',
        'quantity': this.state.quantity || 0,
        'price': this.state.price || 0,
        'total': this.state.quantity * this.state.price
      })
      this.state.items.map((total) => {
        this.setState({
          grandTotal: this.state.grandTotal + total.total
        })
      })
      this.setState({
        items: this.state.items,
        id: this.state.id += 1,
        description: '',
        quantity: '',
        price: '',
        showForm: false
      })
    }
  }

  deleteItem(key) {
    //when deleting an item, prompt total to update
    this.setState({
      grandTotal: this.state.grandTotal - this.state.items[key].total
    })
    this.state.items.splice(key, 1);
    this.setState({items: this.state.items})
  }

  render() {
    let orders = this.state.orderArray.map((val, key) => {
      return <Order key={key} keyval={key} val={val} delete={() => this.delete(key)} />
    })
    return (
      <View style={{flex: 1}}>
        <View style={{alignSelf: 'flex-end', width: 50, height: 50}}>
          <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
          >
            <Text style={{fontSize:50, paddingRight: 30, paddingTop: 10}}>+</Text>
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.scrollview}>
        {orders}
      </ScrollView>
      {this.newOrder()}
        <View style={styles.grandTotal}>
          <Text style={styles.grandTotalText}> Grand total: {this.state.orderTotal}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  section: {
    borderWidth: 5,
    borderColor: 'black',
    padding: 10
  },

  sectionLabel: {
    fontSize: 15,
    color: 'gray',
    marginVertical: 10
  },

  modal: {
    flex: 1,
    borderTopWidth:20,
    borderWidth: 10,
    borderColor: 'gray',
    padding: 20
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
  },

  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  grandTotal: {
    borderTopWidth: 2,
    borderTopColor: 'black'
  },

  grandTotalText: {
    alignSelf: 'flex-end',
    padding: 20,
  },

  itemInput: {
    fontSize: 15
  },

  itemLabel: {
    fontSize: 15,
    color: 'gray',
    marginVertical: 5
  }
});
