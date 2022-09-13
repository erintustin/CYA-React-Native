import { useRef } from 'react';
import { Text, View, StyleSheet, Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';
import * as Animatable from 'react-native-animatable';
import { toggleAddToToolkit } from '../myToolkit/myToolkitSlice';
import { useDispatch } from 'react-redux';
import * as Linking from 'expo-linking';

const RenderResource = (props) => {
    const dispatch = useDispatch();
    const { resource, onShowModal } = props;
    

    const ShareResource = (title, url) => {
        Share.share(
            {
                title,
                message: `${title} ${url}`,
                url
            },
            {
                dialogTitle: 'Share ' + title
            }

        )
    }

    if (resource) {
        return (
            <Animatable.View
                animation='fadeInDownBig'
                duration={2000}
                delay={1000}
            >
                <Card style={styles.cardContainer}>
                
                            <Text style={{
                                color: 'black',
                                textAlign: 'center',
                                fontSize: 25 }}
                            >
                                {resource.name}
                            </Text>
                    
                    <Card.Image source={{uri: baseUrl + resource.img}}>
                    
                    </Card.Image>
                    <Text style={{ margin: 20 }}>By: {resource.author}</Text>
                    <Text style={{ margin: 20 }}>Source: {resource.source}</Text>
                    <View style={styles.cardRow}>
                    <Icon 
                            name='eye'
                            type='font-awesome'
                            color='#1ab4d2'
                            aria-label='add resource'
                            raised
                            reverse
                            onPress={() => Linking.openURL(resource.url)}
                        /> 
                        
                        <Icon 
                            name={props.inToolkit ? 'undo' : 'user-plus'}
                            type='font-awesome'
                            color='#1ab4d2'
                            aria-label='add resource'
                            raised
                            reverse
                            onPress={() => 
                                dispatch(
                                    toggleAddToToolkit(resource.id))}
                        />
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#1ab4d2'
                            raised
                            reverse
                            onPress={props.onShowModal}
                        />
                        <Icon 
                            name='share'
                            type='font-awesome'
                            color='#1ab4d2'
                            aria-label='add resource'
                            raised
                            reverse
                            onPress={() => 
                                ShareResource(
                                    resource.name,
                                    resource.url
                                )}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
        return (
        <View />);
        
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export default RenderResource;