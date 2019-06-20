import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      display: '',
      result: '',
      displayText: {
        flex: 1.2,
        backgroundColor: '#ffdf80',
        textAlign: 'right',
        paddingTop: 10,
        paddingRight: 10,
        fontSize: 80,
      }
    }
  }
  handleOp(op){
    if(op==='C'){
      this.setState({
        display: '',
        result: '',
      })
    }else if(op==='='){
      this.setState({
        display: this.state.result,
        result: '',
      });
      this.setStyles();
    }else{
      const display = this.state.display + op
      let result = this.state.result
      try{
        let fixedOperation = display.split('x').join('*')
        fixedOperation = fixedOperation.split('÷').join('/')
        fixedOperation = fixedOperation.split(',').join('.')
        result = new String(eval(fixedOperation)).toString()
      }catch(e){

      }
      this.setState({
        display,
        result,
      })
      this.setStyles();
    }
  }

  setStyles(){
    if(this.state.display.length > 5){
      this.setState({
        displayText: {
          flex: 1.2,
          backgroundColor: '#ffdf80',
          textAlign: 'right',
          paddingTop: 10,
          paddingRight: 10,
          fontSize: 40,
        }
      })
    }else {
      this.setState({
        displayText: {
          flex: 1.2,
          backgroundColor: '#ffdf80',
          textAlign: 'right',
          paddingTop: 10,
          paddingRight: 10,
          fontSize: 80,
        }
      })
    }
  }

  render() {
    const col1Buttons = [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      [',', '0', '=']
    ]
    const col2Button = ['C', '÷', 'x', '-', '+']

    return (
      <View style={styles.container}>
        <Text style={this.state.displayText}>{this.state.display}</Text>
        <Text style={styles.result}>{this.state.result}</Text>
        <View style={styles.buttons}>
          <View style={styles.col1}>
            {col1Buttons.map(
              (line, ind) => <View key={ind}  style={styles.line}>
              { line.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                 <Text style={styles.btnText}>
                  {op}
                 </Text>
                 </TouchableOpacity>)}
            </View>
            )}
            
          </View>
          <View style={styles.col2}>
          { col2Button.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
            <Text style={styles.btnText}>
             {op}
            </Text>
            </TouchableOpacity>)}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  result: {
    flex: 0.6,
    backgroundColor: '#ffdf80',
    fontSize: 40,
    textAlign: 'right',
    paddingBottom: 30,
    paddingRight: 10,
  },
  buttons: {
    flex: 5,
    flexDirection: 'row',
  },
  col1: {
    flex: 3,
    backgroundColor: '#000000',
  },
  line: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 50,
    color: '#ffffff',
  },
  col2: {
    flex: 1,
    backgroundColor: '#e68a00',
  },
});
