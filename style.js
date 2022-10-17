import { StyleSheet } from "react-native";


const Home_Style = StyleSheet.create({

    ButtonStyle: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        fontWeight: 'bold'

    },

    MainHeadingStyle: {
        fontFamily: 'Gill Sans',
        margin: 25,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontSize: 45,
        fontWeight: 'bold',
        textShadowColor: "rgb(106, 109, 124)",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 15,
        textAlign: "center",
        textDecorationLine:"underline"

    },
})


const All_Videos_Style = StyleSheet.create({

    HeadingStyle: {
        fontFamily: 'Gill Sans',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: "rgb(106, 109, 124)",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 15,
        textAlign: "center"

    },

    AppBarStyle: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    }, 

    TextStyle: {
        fontFamily: 'Gill Sans',
        margin: 7,
        marginTop:12,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontSize: 19,
        fontWeight: 'bold'

    },

    TextStyle2: {
        fontFamily: 'Gill Sans',
        color: '#b3ffff',
        backgroundColor: 'transparent',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft:"5%"

    },

})


const Signup = StyleSheet.create({

    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    field: {
        borderWidth: 3,
        borderColor: "white",
        width: "80%",
        margin: 5
    }

})



const Video_Style = StyleSheet.create({

    TextStyle: {
        fontFamily: 'Gill Sans',
        margin: 7,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontSize: 25,
        fontWeight: 'bold',
        textDecorationLine:"underline"

    },

    TextStyle2: {
        fontFamily: 'Gill Sans',
        color: '#b3ffff',
        backgroundColor: 'transparent',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft:'2.2%'

    },

})

const Categories_Style = StyleSheet.create({

    Category_text: {
        color: "white",
        fontSize: 45,
        fontWeight: "bold",
        textAlign: "center",
        marginTop:'15%',
        textDecorationLine:"underline"
      },


})



const Model = StyleSheet.create({

    field: {
        borderWidth: 3,
        borderColor: "white",
        width: "120%",
        height:'10%',
        margin: 15
    },

    Picker: {
        width: 270,
        height: 30,
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Gill Sans',
        margin: 15
        
    }
})
export { Home_Style, All_Videos_Style, Signup, Video_Style, Categories_Style,Model }