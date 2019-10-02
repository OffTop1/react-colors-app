export default {
    root:{
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover svg":{
            opacity:1
        }
    },
    colors:{
        backgroundColor:"#dae1e4",
        width:"100%",
        height:"100px",
        borderRadius:"5px",
        overflow:"hidden"
    },
    title:{
        display: "flex",
        justifyContent: "space-between",
        alignItems:"center",
        margin: "0",
        color:"black",
        paddingTop:"0.5rem",
        fontSize:"0.8rem",
        position:"relative"
    },
    emoji:{
        marginLeft:"0.5rem",
        fontSize:"1.5rem"
    },
    miniColor:{
        width:"20%",
        height:"25%",
        margin:"0 auto",
        display:"inline-block",
        position:"relative",
        marginBottom:"-3.5px"
    },
    delete:{},
    deleteIcon:{
        color:"white",
        backgroundColor: "#eb3d30",
        width: "20px",
        height:"20px",
        position:"absolute",
        right:"0px",
        top:"0px",
        padding:"10px",
        zIndex:10,
        opacity:0,
        "& svg":{
            color:"white"
        }
    }
}
