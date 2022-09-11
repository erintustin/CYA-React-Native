import { Text, View, ScrollView, ImageBackground, Image, StyleSheet } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import confetti from '../assets/img/confettiBg.png';
import logo from '../assets/img/CYAlogo.png';
import cake from '../assets/img/cake.png';
import squishmallow from '../assets/img/squishmallow.png';
import feedback from '../assets/img/feedbacklogo.png'
import headericon1 from '../assets/img/headerIcon1.png';
import headericon2 from '../assets/img/headerIcon2.png';
import headericon3 from '../assets/img/headerIcon3.png';

const CoreValues = () => {
    return(
        <>
        <Card>
            <ListItem>
                <Avatar 
                    source={headericon1}
                />
                <ListItem.Content>
                    <ListItem.Title>Ending Myths and Stereotypes</ListItem.Title>
                        <ListItem.Subtitle>
                            Autism has been misrepresented by the medical community,
                            in the media, and by charitable organizations.
                        </ListItem.Subtitle>
                    </ListItem.Content>
            </ListItem>
            <ListItem>
            <Avatar 
                source={headericon2}
            />
            <ListItem.Content>
                <ListItem.Title>Nothing About Us Without Us</ListItem.Title>
                    <ListItem.Subtitle>
                        Resources written by the #1 experts on the autistic 
                        experience--autistic people.
                    </ListItem.Subtitle>
                </ListItem.Content>
        </ListItem>
        <ListItem>
            <Avatar 
                source={headericon3}
            />
            <ListItem.Content>
                <ListItem.Title>Celebrating Neurodiversity</ListItem.Title>
                    <ListItem.Subtitle>
                        Autism is a developmental disability--and
                        disability is a natural part of human diversity.
                    </ListItem.Subtitle>
                </ListItem.Content>
        </ListItem>
        </Card>
        </>
    );
}
const BrowseResources = () => {
    return(
        <Card
            containerStyle={{ padding: 0 }}
            style={styles.card}>
                
                <Card.Image
                    source={cake}
                    style={{resizeMode: 'contain'}}
                >
                   <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text
                    style={styles.cardTitle}>
                    BROWSE RESOURCES
                </Text>
                </View>
                
                </Card.Image>
        </Card>
    )
};

const MyToolkit = () => {
    return(
        <Card
            containerStyle={{ padding: 0 }}
            style={styles.card}>
                
                <Card.Image
                    source={squishmallow}
                    style={{resizeMode: 'contain', justifyContent: 'center'}}
                >
                   <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text
                    style={styles.cardTitle}>
                    MY TOOLKIT
                </Text>
                </View>
                
                </Card.Image>
        </Card>
    )
};

const Feedback = () => {
    return(
        <Card
            containerStyle={{ padding: 0 }}
            style={styles.card}>
                
                <Card.Image
                    source={feedback}
                    style={{resizeMode: 'contain'}}
                >
                   <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text
                    style={styles.cardTitle}>
                    PROVIDE FEEDBACK
                </Text>
                </View>
                
                </Card.Image>
        </Card>
    )
};

const HomeScreen = () => {
    const resources = useSelector((state) => state.resources);
    
    return(
       <ScrollView style={{ backgroundColor: '#fff'}}>
        <ImageBackground 
            source={confetti}
            style={{width: '100%', height: '100%'}}>
        <Text style={styles.title}>Congrats, You're Autistic!</Text>
        
        <Image
            style={styles.logo}
            source={logo}
            />
            <Text style={styles.subtitle}>Build Your Own Neurodiversity-Affirming Toolkit </Text>
            
        <CoreValues />
        <BrowseResources />
        <MyToolkit />
        <Feedback />
        </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
 
    logo: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        resizeMode:'contain'
    },
    title: {
        fontFamily: 'GochiHand_400Regular',
        fontSize: 40,
        textAlign: 'center',
        shadowColor: "gray",
        backgroundColor: 'rgba(255, 255, 255, .8)',
        marginTop: 25,
    },
    subtitle: {
        fontFamily: 'Catamaran_400Regular',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        shadowColor: "gray",
        backgroundColor: 'rgba(255, 255, 255, .8)',
        padding: 10
        
    },
    card: {
    

    },
    cardTitle: {
        color: 'black', 
        textAlign: 'center', 
        fontSize: 25, 
        fontFamily: 'Catamaran_400Regular',
        backgroundColor: 'rgba(255, 255, 255, .8)'
    }
   
})

export default HomeScreen;