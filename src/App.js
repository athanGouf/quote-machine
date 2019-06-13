import React, { Component } from 'react';
import { random } from 'lodash';
import 'typeface-roboto';
import { Grid, withStyles } from '@material-ui/core';
import Quotemachine from './components/Quotemachine';

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    background: 'linear-gradient(#35577D, #141E30)'
  }
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      quotes : [],
      selectedQuotedIndex : null
    };
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
    this.selectedQuoteIndex = this.selectedQuoteIndex.bind(this);
  }

  get selectedQuote(){
    if(!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)){
      return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
  }

  componentDidMount(){
    fetch('https://gist.githubusercontent.com/shreyasminocha/7d5dedafc1fe158f82563c1223855177/raw/325d51aca7165b2498971afcff9bed286a52dc0e/quotes.json')
      .then(data => data.json())
      .then(quotes => this.setState({ quotes }, this.assignNewQuoteIndex));
  }

  /**
   * Returns an integer representing an index in state.quotes
   * if state.quotes is empty, returns undefined 
   */
  selectedQuoteIndex() {
    if(!this.state.quotes.length){
      return undefined;
    }
    return random(0 , this.state.quotes.length -1);
  } 
  
  assignNewQuoteIndex(){
    this.setState({ selectedQuoteIndex : this.selectedQuoteIndex()})
  }
  
  render() { 
    console.log(this.state.selectedQuoteIndex)
    return (
      <Grid className = {this.props.classes.container} id="quote-box" justify="center" container>
        <Grid xs ={11} lg = {5} item>
          {this.selectedQuote ? 
            <Quotemachine selectedQuote = {this.selectedQuote} assignNewQuoteIndex = {this.assignNewQuoteIndex}/>
            : null};
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
