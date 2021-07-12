import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image, FlatList,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pick from "./Pick";



import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { color } from "react-native-reanimated";
//import { FlatList } from "react-native-gesture-handler";

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

let story = require("./PostPick.json");

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            light_theme:true
        };
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();

    }

    
    async fetchUser() {
        let theme;
        await firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
                theme = snapshot.val().current_theme;
                this.setState({ light_theme: theme==="light"  })
            })

    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts)
        this.setState({ fontsLoaded: true })
    }

    keyExtractor = (item, index) => index.toString();


    renderItem = ({ item: myPick }) => {
        return <Pick story={myPick} navigation={this.props.navigation} />;
    }
render() {
        if (!this.state.fontsLoaded) {
            // !true = fale
            return <AppLoading />;
        }
        else {

            return (
                <View style={this.state.light_theme?styles.containerLight:styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                                source={require('../assets/logo1.png')}
                                style={styles.iconImage} />
                        </View>
                        <View style={styles.appTitleTextContainer}>
                         <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}> SPECTAGRAM </Text>
                        </View>
                    </View>

                    <View style={styles.storyContainer}>
                        <ScrollView>
                            <View style={styles.dataContainer}>
                                <View style={styles.titleTextContainer}>
                                    <Text style={this.state.light_theme?styles.AuthorTextLight:styles.AuthorText}>
                                        {this.props.route.params.story.author}
                                    </Text>
                                </View>
                            <View style={styles.storyTextContainer}>
                                <Text style={this.state.light_theme?styles.captionTextLight:styles.captionText}>
                                    {this.props.route.params.story.caption}
                                </Text>
                                </View>
                                <Image
                                source={require('../assets/image_1.jpg')}
                                style={styles.image}
                            />
                            </View>
                            <View style={styles.actionContainer}>
                                <View style={styles.likeButton}>
                                    <Text style={ this.state.light_theme?styles.likeTextLight:styles.likeText}>100K</Text>
                                    <Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
                                </View>
                            </View>


                        </ScrollView>
                    </View>


                </View>


            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    containerLight: {
        flex: 1,
        backgroundColor: 'white',
    },
    droidSafeArea: {
        marginTop:
            Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
    },
    appTitle: {
        flex: 0.07,
        flexDirection: 'row',
    },
    appIcon: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: 'center',
    },
    appTitleText: {
        color: 'white',
        fontSize: RFValue(28),
        fontFamily: 'Bubblegum-Sans',
    },
    appTitleTextLight: {
        color: 'black',
        fontSize: RFValue(28),
        fontFamily: 'Bubblegum-Sans',
    },
    storyContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        alignSelf: 'center',
        height: RFValue(200),
        borderTopLeftRadius: RFValue(20),
        borderTopRightRadius: RFValue(20),
        resizeMode: 'contain',
        alignItems:'center'
    },
    dataContainer: {
        flexDirection: 'row',
        padding: RFValue(20),
    },
    titleTextContainer: {
        flex: 0.8,
    },
    AuthorText: {
        fontFamily: 'Bubblegum-Sans',
        fontSize: RFValue(20),
        color: 'white',
        alignSelf:'center'
    },
    AuthorTextLight: {
        fontFamily: 'Bubblegum-Sans',
        fontSize: RFValue(20),
        color: 'black',
        alignSelf:'center'
    },
    storyTextContainer: {
        padding: RFValue(20),
    },
    captionText:{
        color:'white',
      fontSize: RFValue(20),
      alignSelf:'center',
      fontFamily:'Bubblegum-Sans'
    },
    captionTextLight:{
        color:'black',
      fontSize: RFValue(20),
      alignSelf:'center',
      fontFamily:'Bubblegum-Sans'
    },
    
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: RFValue(10),
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        flexDirection: 'row',
        backgroundColor: '#eb3948',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFValue(30),
    },
    likeText: {
        color: 'white',
        fontFamily: 'Bubblegum-Sans',
        fontSize: RFValue(25),
        marginLeft: RFValue(5),
    },
    likeTextLight: {
        color: 'black',
        fontFamily: 'Bubblegum-Sans',
        fontSize: RFValue(25),
        marginLeft: RFValue(5),
    },
});
