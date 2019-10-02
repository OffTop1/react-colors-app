import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';



 class PaletteMetaForm extends Component {
     constructor(props){
         super(props);
        this.state = {
            stage: "form",
            newPaletteName: "" 
        }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
     }

     componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            this.props.palettes.every(
              ({paletteName})=> paletteName !== this.state.newPaletteName 
            )
        });
     }
     handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value});
      }

      showEmojiPicker(){
          this.setState({ stage:"emoji" });
      }

      savePalette(emoji){
          const newPalette = {
              paletteName: this.state.newPaletteName,
              emoji: emoji.native
          }
          this.props.handleSubmit(newPalette);
          this.setState({ stage:"" });
      }

     handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render() {
        const { handleSubmit, hideForm } = this.props;
        const { newPaletteName, stage } = this.state;
        return (
                <div>
                    <Dialog open={stage === "emoji"} onClose={hideForm} >
                        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                        <Picker title="Pick A Palette Emoji" onSelect={this.savePalette} />
                    </Dialog>
                <Dialog
                open={stage === "form"}
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={this.showEmojiPicker}>
                <DialogContent>
                    <DialogContentText>
                    Enter a name for your beautiful palette. It must be unique!
                    </DialogContentText>
                    
                        <TextValidator 
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                            //validators={['required', "isPaletteNameUnique"]}
                            //errorMessages={['this field is required', "Palette name mus be unique!"]}
                            />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">Cancel</Button>
                    <Button variant="contained" color="primary" type="submit">SAVE PALETTE</Button>
                </DialogActions>
                </ValidatorForm>
                </Dialog>
                </div>
        )
    }
}


export default PaletteMetaForm;
