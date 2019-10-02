import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ChromePicker from 'react-color';
import styles from './styles/ColorPickerFormStyles';



 class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state = { currentColor: "purple", newColorName: "" }
        this.changeCurrentColor = this.changeCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }
    changeCurrentColor(newColor){
        this.setState({currentColor: newColor.hex});
    }
    handleChange(evt){
      this.setState({[evt.target.name]: evt.target.value});
    }
    handleSubmit(newPalette){
        const newColor = {
            name: this.state.newColorName,
            color: this.state.currentColor
          }
        this.props.addNewColor(newColor);
    }
    render() {
        const { currentColor, newColorName } = this.state;
        const { isPaletteFull, classes } = this.props;
        return (
            <div>
                <ChromePicker 
                color={currentColor} 
                className={classes.picker}
                onChangeComplete={this.changeCurrentColor}
                 />
                <ValidatorForm onSubmit={this.handleSubmit} >
                    <TextValidator 
                    value={newColorName}
                    variant="filled"
                    margin="normal"
                    placeholder="Enter Name"
                    className={classes.colorNameInput}
                    name="newColorName"
                    onChange={this.handleChange}
                    // validators={['required', "isColorNameUnique", "isColorUnique"]}
                    // errorMessages={['this field is required', "Colorname must be unique!", "Color is already used!"]}
                    />
                    <Button 
                    className={classes.addColor}
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    disabled={isPaletteFull}
                    style={{backgroundColor: isPaletteFull ? "grey": currentColor}}
                    >
                    {isPaletteFull? "Palette Full": "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);
