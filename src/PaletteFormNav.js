import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PaletteMetaForm from './PaletteMetaForm';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ChromePicker from 'react-color';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import styles from './styles/PaletteFormNavStyles';

 class PaletteFormNav extends Component {
     constructor(props){
         super(props);
        this.state={ newPaletteName: "", formShowing: false }
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
     }
     componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            this.props.palettes.every(
              ({paletteName})=> paletteName !== this.state.newPaletteName 
            )
        });
     }
     showForm(){
       this.setState({ formShowing: true })
     }
     hideForm(){
      this.setState({ formShowing: false })
     }

     handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value});
      }
    render() {
        const { classes, open, handleDrawerOpen, handleSubmit, palettes } = this.props;
        const { newPaletteName, formShowing } = this.state;
        return (
        <div className={classes.root}>
            <CssBaseline />
          <AppBar
          color="default"
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton,{ [classes.hide]:open })}
              >
                <AddToPhotosIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Create A Palette
              </Typography>
              
            </Toolbar>
            <div className={classes.navBtns}>
            <Button className="button" variant="contained" color="primary" onClick={this.showForm}>
                Save
            </Button>
              <Link to="/">
                <Button className="button" variant="contained" color="secondary">
                    Go Back
                </Button>
              </Link>
              </div>
          </AppBar>
          {formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} /> }
        </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
