import { useRef } from 'react';
import { Text, View, StyleSheet, Share, Button } from 'react-native';
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

    const ShareResourceWithNote = (title, note, url) => {
        Share.share(
            {
                title,
                message: `${title}: ${url} --${note}`,
                url
            },
            {
                dialogTitle: 'Share ' + title + ' with note'
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
                    <Text style={{ marginTop: 5, marginBottom: 0 }}>By: {resource.author}</Text>
                    <Text style={{ marginTop: 0, marginBottom: 20 }}>Source: {resource.source}</Text>
                
                    <View style={styles.buttons}>
                        <Button 
                            title='View Resource' 
                            color='#1ab4d2'
                            onPress={() => Linking.openURL(resource.url)}
                        />  
                    </View>
                    <View style={styles.buttons}>
                        <Button 
                            style={styles.buttons}
                            title={props.inToolkit ? 'Remove from Toolkit' : 'Add to Toolkit'}
                            color='#1ab4d2'
                            onPress={() => 
                                dispatch(
                                    toggleAddToToolkit(resource.id))}
                        />
                      </View>
                    <View style={styles.buttons}>
                        <Button
                            style={styles.buttons}
                            title='Add Note'
                            color='#1ab4d2'
                            onPress={props.onShowModal}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <Button 

                            title='Share Resource'
                            color='#1ab4d2'
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
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        flexWrap: 'wrap',
        flexDirection: 'row',
        
    },
    buttons: {
        margin: 5,
        marginLeft: 15,
        marginRight: 15
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