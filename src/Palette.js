import React, { Component } from 'react';
import './Palette.css';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';



 class Palette extends Component {
     constructor(props){
         super(props);
         this.state = { level: 500, format: "hex" }
         this.levelChange = this.levelChange.bind(this);
         this.changeFormat = this.changeFormat.bind(this);
     }

     levelChange(level){
         this.setState({level});
     }

     changeFormat(val){
         this.setState({format:val});
     }

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const { classes } = this.props;
        const colorBoxes = colors[level].map( color =>(
            <ColorBox background={color[format]}
             name={color.name} 
             key={color.id} 
             moreUrl={`/palette/${id}/${color.id}`}
             showFullColors={true}
             />
        ));
        return (
            <div className={classes.Palette}>
                <Navbar level={level} levelChange={this.levelChange} formatChange={this.changeFormat} showAllColors/>
                {/* Navbar goes here */}
               <div className={classes.colors}>{colorBoxes}</div>
               {/* Footer eventually */}
               <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);
