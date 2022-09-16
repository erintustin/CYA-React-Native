import { Text, View, Animated, ImageBackground, Image, 
        StyleSheet, TouchableOpacity, Modal, ScrollView, 
        TextInput } from 'react-native';
import { ListItem, Avatar, Card, Button } from 'react-native-elements';
import confetti from '../assets/img/confettiBg.png';
import logo from '../assets/img/CYAlogo.png';
import cake from '../assets/img/cake.png';
import squishmallow from '../assets/img/squishmallow.png';
import poptubes from '../assets/img/poptubes.png';
import feedback from '../assets/img/feedbacklogo.png'
import headericon1 from '../assets/img/headerIcon1.png';
import headericon2 from '../assets/img/headerIcon2.png';
import headericon3 from '../assets/img/headerIcon3.png';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

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

const About = () => {
    const navigation = useNavigation();
    return(
        <Card
            containerStyle={{ padding: 0 }}
            style={styles.card}>
                
                <Card.Image
                    source={cake}
                    style={{resizeMode: 'contain'}}
                >
                   <View style={{ justifyContent: 'center', flex: 1 }}>
                        <TouchableOpacity 
                        
                        onPress={() =>
                                navigation.navigate('About')
                                }> 
                        <Text
                            style={styles.cardTitle}>
                            ABOUT
                        </Text>
                        </TouchableOpacity>
                    </View>
                </Card.Image>
        </Card>
    )
};

const BrowseResources = () => {
    const navigation = useNavigation();
    return(
        <Card
            containerStyle={{ padding: 0 }}
            style={styles.card}>
                
                <Card.Image
                    source={poptubes}
                    style={{resizeMode: 'contain'}}
                >
                
                   <View style={{ justifyContent: 'center', flex: 1 }}>
                    <TouchableOpacity 
                    
                    onPress={() =>
                            navigation.navigate('Directory')
                            }> 
                    <Text
                        style={styles.cardTitle}>
                        BROWSE RESOURCES
                    </Text>
                    </TouchableOpacity>
                </View>
               
                
                </Card.Image>
        </Card>
    )
};

const MyToolkit = () => {
    const navigation = useNavigation();
    return(
        <Card 
            containerStyle={{ padding: 0 }}
            style={styles.card}
            >
                
                <Card.Image
                    source={squishmallow}
                    style={{resizeMode: 'contain', justifyContent: 'center'}}
                >
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <TouchableOpacity 
                        
                        onPress={() =>
                                navigation.navigate('MyToolkit')
                                }> 
                        <Text
                            style={styles.cardTitle}>
                            MY TOOLKIT
                        </Text>
                        </TouchableOpacity>
                    </View>
                
                </Card.Image>
        </Card>
    )
};

const Feedback = () => {
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comments, setComments] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const feedback = {
            name: name,
            email: email,
            feedback: comments
        };
        dispatch(postFeedback(feedback));
        setShowFeedbackModal(!showFeedbackModal);
        resetForm();
    };
    
    const resetForm = () => {
        setName('');
        setEmail('');
        setComments('');
    };

    return(
        <>
        <Card
            containerStyle={{ padding: 0 }}
            style={styles.card}>
                
                <Card.Image
                    source={feedback}
                    style={{resizeMode: 'contain'}}
                >
                   <View style={{ justifyContent: 'center', flex: 1 }}>
                        <TouchableOpacity 
                        
                        onPress={() =>
                                setShowFeedbackModal(!showFeedbackModal)
                                }> 
                        <Text
                            style={styles.cardTitle}>
                            PROVIDE FEEDBACK
                        </Text>
                        </TouchableOpacity>
                    </View>
                
                </Card.Image>
        </Card>
            <Modal
                animationType='slide'
                transparent={false}
                visible={showFeedbackModal}
                style={{margin: 10}}
                onRequestClose={() => setShowFeedbackModal(!showFeedbackModal)}
            >
            <ImageBackground
                source={confetti}
                style={{width: '100%', height: '100%'}} 
            >
                <ScrollView>
                <View style={styles.modal}>
                    <Text style={styles.modalHeader}>Provide Feedback</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>
                                Name:
                            </Text>
                            <TextInput
                                width='95%'                                
                                style={styles.textInput}
                                placeholder='Name'
                                onChangeText={(name) => setName(name)}
                                value={name}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>
                                E-mail:
                            </Text>
                            <TextInput
                                width='95%'
                                style={styles.textInput}
                                placeholder='email@email.com'
                                onChangeText={(email) => setAuthor(email)}
                                value={email}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>
                                Comments:
                            </Text>
                        </View>
                        <View style={styles.comments}>
                            <TextInput
                                multiline
                                numberOfLines={15}
                                width='95%'
                                style={styles.textInput}
                                placeholder='Thank you for supporting this project with your feedback!'
                                onChangeText={(comments) => setUrl(comments)}
                                value={comments}
                            />
                        </View>
                        <View style={styles.formButtons}>
                            <Button
                                onPress={() => handleSubmit()}
                                title='SUBMIT'
                                accessibilityLabel='Tap me to submit your feedback.'
                                buttonStyle={{margin: 2, backgroundColor: '#1ab4d2'}}
                            />
                        
                            <Button
                                onPress={() => {
                                    setShowFeedbackModal(!showFeedbackModal);
                                    resetForm();
                                }}
                                title='CANCEL'
                                buttonStyle={{margin: 2, backgroundColor: 'gray'}}
                            />
                        </View>
                    </View>
                </View>
                </ScrollView> 
            </ImageBackground>       
        </Modal>
        </>
    )
};

const HomeScreen = ({ navigation }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
    });
    useEffect(() => {
        scaleAnimation.start();
    }, []);

    return(
       <Animated.ScrollView 
            style={{ 
                transform: [{ scale: scaleValue }], 
                backgroundColor: '#fff'}}>
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
        <About />
        <BrowseResources />
        <MyToolkit />
        <Feedback />
        </ImageBackground>
        </Animated.ScrollView>
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
    cardTitle: {
        color: 'black', 
        textAlign: 'center', 
        fontSize: 25, 
        fontFamily: 'Catamaran_400Regular',
        backgroundColor: 'rgba(255, 255, 255, .8)'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalHeader: {
        backgroundColor: '#1ab4d2', 
        borderWidth: 1,
        fontSize: 30,
        padding: 5,
        textAlign: 'center',
        fontFamily: 'GochiHand_400Regular',
        marginTop: 20,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
      },
    formContainer: {
        borderWidth: 1,
        paddingTop: 20,
        marginTop: -1,
        backgroundColor: '#fff'
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    formButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 10,

    },
    formLabel: {
        fontSize: 16,
        flex: 2,
        fontWeight: '700'
    },
    textInput: {
        width: '80%',
        margin: 5,
        marginTop: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        padding: 5,
    },
    comments: {
        width: '100%',
        flexDirection:'row',
        justifyContent:'center'
    }
   
})

export default HomeScreen;