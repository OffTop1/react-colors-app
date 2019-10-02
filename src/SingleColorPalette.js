import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import styles from './styles/SinglePaletteStyles';
 

 class SingleColorPalette extends Component {
     constructor(props){
         super(props);
         this.state = { format: "hex"}
         this._shades = this.getShades(this.props.palette, this.props.colorId);
         this.changeFormat = this.changeFormat.bind(this);
     }

     getShades(palette, colorToFilterById){
         let shades = [];
         let allColors = palette.colors;
         for(let key in allColors ){
             shades = shades.concat(allColors[key].filter(color=>color.id === colorToFilterById));
         }

         return shades.slice(1);
     }

     changeFormat(val){
        this.setState({format:val});
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { format } = this.state;
        const { classes } = this.props;
        const colorBoxes = this._shades.map( color =>(
            <ColorBox 
             background={color[format]}
             name={color.name} 
             key={color.name} 
             showFullColors={false}
             />
        ));
        return (
            <div className={classes.Palette}>
                <Navbar formatChange={this.changeFormat} />
                <div className={classes.colors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${id}`}>GO BACK</Link>
                </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} showAllColors={false} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);