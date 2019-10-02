import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';


  class NewPaletteForm extends Component {
    static defaultProps = {
      maxColors: 20
    }
    constructor(props){
      super(props);
      this.state = { 
        open: false, 
        newPaletteName: "", 
        colors: seedColors[0].colors 
      };
      this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
      this.handleDrawerClose = this.handleDrawerClose.bind(this);
      this.changeCurrentColor = this.changeCurrentColor.bind(this);
      this.addNewColor = this.addNewColor.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColor = this.removeColor.bind(this);
      this.clearColors = this.clearColors.bind(this);
      this.addRandomColors = this.addRandomColors.bind(this);

    }
    
    
    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            this.state.colors.every(
              ({name})=> name.toLowerCase() !== value.toLowerCase()
            )
        });
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
          this.state.colors.every(
            ({color})=> color !== this.state.currentColor 
          )
      });
     

    
    }
    removeColor(colorName){
      this.setState({colors: this.state.colors.filter(color =>{
        return color.name !== colorName
      }) });
     
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    };

    handleDrawerOpen() {
      this.setState({open:true});
    }
  
    handleDrawerClose() {
      this.setState({open:false});

    }

    changeCurrentColor(newColor){
        this.setState({currentColor: newColor.hex});
    }
    handleChange(evt){
      this.setState({[evt.target.name]: evt.target.value});
    }
    addNewColor(newColor){
      this.setState({ colors: [...this.state.colors, newColor], newColorName:"" });
        
    }
    
    handleSubmit(newPalette){
      newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
      newPalette.colors = this.state.colors;
      this.props.savePalette(newPalette);
      this.props.history.push("/");
    }
    clearColors(){
      this.setState({colors:[]});
    }
         
    addRandomColors(){
      const allColors = this.props.palettes.map(p=> p.colors).flat();
      let rand;
      let randomColor;
      let isDuplicateColor = true;
      while(isDuplicateColor){
        rand = Math.floor(Math.random() * allColors.length);
        randomColor = allColors[rand];
        isDuplicateColor = this.state.colors.some(color=> color === randomColor);
        
      }
      this.setState({ colors: [...this.state.colors,randomColor] });
    }

    render() {
      const { classes, maxColors, palettes } = this.props;
      const { open, currentColor, colors, newColorName, newPaletteName } = this.state;
      const isPaletteFull = colors.length >= maxColors;
      return (
        <div className={classes.root}>
          <PaletteFormNav palettes={palettes} open={open} handleDrawerOpen={this.handleDrawerOpen} handleSubmit={this.handleSubmit} />
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon /> 
              </IconButton>
            </div>
            <Divider />
  
           <div className={classes.container}>
            <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
              <div className={classes.buttons}>
                <Button 
                className={classes.button}
                variant="contained" 
                color="secondary" 
                onClick={this.clearColors}
                >
                  CLEAR PALETTE
                </Button>
                <Button 
                className={classes.button}
                variant="contained" 
                color="primary" 
                disabled={isPaletteFull} 
                onClick={this.addRandomColors}
                >
                  RANDOM PALETTE
                </Button>
              </div>
              <ColorPickerForm 
              isPaletteFull={isPaletteFull} 
              addNewColor={this.addNewColor}
              />
           </div>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
          
          <DraggableColorList 
          colors={colors} 
          removeColor={this.removeColor}
          axis="xy"
          onSortEnd={this.onSortEnd}
          distance={20}
          />
          </main>
        </div>
      );
    }
  }
  export default withStyles(styles, { withTheme: true })(NewPaletteForm);





