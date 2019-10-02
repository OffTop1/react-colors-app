import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';


class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id){
    return this.state.palettes.find(palette=>{
      return palette.id === id;
    })
  }

  deletePalette(id){
    this.setState(st=>({ palettes: st.palettes.filter(palette=> palette.id !== id) }),
    this.syncLocalStorage
    )
  }

  savePalette(newPalette){
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
  }
  syncLocalStorage(){
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }
  render(){
    return (
      <Route render={({location})=> (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500} >
        <Switch location={location}>
        <Route path="/palette/new" render={(routeProps)=><Page><NewPaletteForm palettes={this.state.palettes} savePalette={this.savePalette} {...routeProps} /> </Page>}  /> 
        <Route exact path="/" render={(routeProps)=> <Page><PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes}  {...routeProps} /> </Page>}  /> 
        <Route exact 
        path="/palette/:id" 
        render={(routeProps)=> <Page><Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} /> </Page>} /> 
        <Route exact 
        path="/palette/:paletteId/:colorId"
        render={(routeProps)=><Page><SingleColorPalette
          colorId={routeProps.match.params.colorId} 
          paletteId={routeProps.match.params.paletteId}
          palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} /> </Page>}
        />
        {/* <Route 
        render={(routeProps)=> (
        <Page>
          <PaletteList 
          deletePalette={this.deletePalette} 
          palettes={this.state.palettes}  
          {...routeProps} /> 
        </Page>
          )} 
         /> */}
      </Switch>
      </CSSTransition>
      </TransitionGroup>
      )} />
      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
