import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    PaletteFooter: {
        background: "white",
        height: "5vh",
        display:"flex",
        justifyContent:"flex-end",
        alignItems: "center",
        fontWeight: "bold"
    },
    emoji: {
        fontSize: "1rem",
        margin: "0 1rem"
    }
}

function PaletteFooter(props){
    const { paletteName, emoji, classes } = props;
    return(
        <footer className={classes.PaletteFooter}>
            { paletteName }
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    );
}

export default withStyles(styles)(PaletteFooter);