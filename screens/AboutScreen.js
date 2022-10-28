import { ScrollView, Text, ImageBackground } from 'react-native';
import { Card, Button } from 'react-native-elements';
import cake from '../assets/img/cake.png';
import squishmallow from '../assets/img/squishmallow.png'
import confetti from '../assets/img/confettiBg.png'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

function Welcome() {
    return (
        <Card>
            <Card.Image
                source={cake}
                style={{resizeMode: 'contain'}}
                >
            <Card.Title 
                style={{fontSize: 40, 
                marginTop: 80, 
                fontWeight: 'normal', 
                fontFamily: 'GochiHand_400Regular'}}
                >Congratulations!</Card.Title>
            </Card.Image>
            <Text style={{ margin: 10 }}>
                If you’re using this app maybe you were recently diagnosed as autistic, 
                or have come to the realization on your own. You may have been told that someone 
                you know or care about is autistic. For any of the above, Congratulations! 
                You have been given a wonderful opportunity to better get to know yourself or 
                someone you love.
            </Text>
            <Text style={{ margin: 10 }}>
                Understanding Autism through the lens of Neurodiversity is an important first 
                step and something to be celebrated! This app seeks to provide streamlined 
                access to some of the best online resources about Autism created by Autistic people. 
            </Text>
            <Text style={{ margin: 10 }}>
                Autistic people deserve to be loved and accepted just as they are. This toolkit
                 is not designed to fix Autistic people, but to fix the way people think about us.
            </Text>
            <Text style={{ margin: 10 }}>Welcome to the Autistic Community!
            </Text>
        </Card>
    );
};

function HowTo() {
    return (
        <Card>
            <Card.Image
                source={squishmallow}
                style={{resizeMode: 'contain'}}
                >
            <Card.Title 
                style={{fontSize: 35, 
                marginTop: 85, 
                fontWeight: 'normal', 
                fontFamily: 'GochiHand_400Regular'}}>
                Using Your Toolkit</Card.Title>
            </Card.Image>
            <Text style={{ margin: 10 }}>
                Not all Autistic people are the same, so rather than provide a singular 'Guide to Autism', your toolkit
                is a personalized selection of resources that are relevant to you and your and support needs. You can
                even add your own favorite online resources that are not currently in our directory. 
            </Text>
            <Text style={{ margin: 10 }}>
                A positive understanding of one's neurotype along with a supportive community are building blocks to living a fulfilling autistic life. 
                This app is designed to easily share information and resources
                with those you are closest to. 
            </Text>
            <Text style={{ margin: 10 }}>
                By spreading more accurate information about the autistic experience to those who can 
                make a direct impact in our lives, the goal is to help build strong support systems
                around autistic people, and to empower our communities to be neurodiversity-affirming spaces that are safe and accomodating to everyone. 
            </Text>
        </Card>
    );
};

const GetStarted = () => {
    const navigation = useNavigation();
    return (
        <Card>
        <Button 
            title='GET STARTED!' 
            buttonStyle={{backgroundColor: '#1ab4d2'}}
            onPress={() => navigation.navigate('Directory')}
            accessibilityLabel='Press here to get started!'
        />
        </Card>
    );
};

const AboutScreen = () => {
        return (
            <ImageBackground
                source={confetti}
                style={{width: '100%', height: '100%'}} 
            >
            <ScrollView>
                <Animatable.View
                    animation='fadeInDown'
                    duration={2000}
                    delay={1000}
                >
                    <Welcome />
                    <HowTo />
                    <GetStarted />
                    <Card>
                       
                    </Card>
                </Animatable.View>
            </ScrollView>
            </ImageBackground>
        )
};

export default AboutScreen;