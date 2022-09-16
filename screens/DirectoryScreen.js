import { FlatList, Text, ScrollView, View, Modal, StyleSheet, 
        Alert, TouchableOpacity, Share, TextInput, 
        ImageBackground } from 'react-native';
import { ListItem, Avatar, Icon, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Loading  from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleAddToToolkit } from '../features/myToolkit/myToolkitSlice';
import { postResource } from '../features/resources/resourcesSlice';
import confetti from '../assets/img/confettiBg.png'

const DirectoryScreen = ({ navigation }) => {
    const resources = useSelector((state) => state.resources);
    const myToolkitResources = useSelector((state) => state.myToolkitResources);

    const [showAddResourceModal, setShowAddResourceModal] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [source, setSource] = useState('');
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {

        const id = resources.length + 1;
        const newResource = {
            id: id.toString(),
            name: name,
            author: author,
            source: source,
            url: url
        };
        dispatch(postResource(newResource));
        setShowAddResourceModal(!showAddResourceModal);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setAuthor('');
        setSource('');
        setUrl('');
    };
    

    if (resources.isLoading) {
        return <Loading />;
    }
    if (resources.errMess) {
        return (
            <View>
                <Text>{resources.errMess}</Text>
            </View>
        );
    };

    const renderDirectoryItem = ({item: resource}) => {
        const addToToolkit = () => {
            if (myToolkitResources.some(resourceId => resourceId === resource.id)) {
                return (
                    Alert.alert(
                        'Already in Toolkit',
                        '"' + resource.name + '" By ' + resource.author + ' is already in your toolkit',
                        [
                            {
                                text: 'Remove',
                                onPress: () => 
                                dispatch(
                                    toggleAddToToolkit(resource.id)
                                ),
                            },
                            {
                                text: 'Cancel',
                                onPress: () =>
                                    console.log(
                                        resource.name + 'already in toolkit'
                                    ),
                                style: 'cancel'
                            },
                        ],
                        {cancelable: false}
                    ))
                } else {
                    return (
                    Alert.alert(
                        'Add to Toolkit?',
                        '"' + resource.name + '" By ' + resource.author + ' will be added to your Toolkit.',
                        [
                            {
                                text: 'Cancel',
                                onPress: () =>
                                    console.log(
                                        resource.name + ' not added'
                                    ),
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress:() => 
                                    dispatch(
                                        toggleAddToToolkit(resource.id)
                                    )
                            }
                        ],
                        {cancelable: false}
                    )
                )
            }
        };

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
        return(
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                <SwipeRow rightOpenValue={-200}>
                <View style={styles.addToToolkitView}>
                    <TouchableOpacity 
                        style={styles.toolkitTouchable}
                        onPress={() => addToToolkit()}
                    >
                        <Text style={styles.addToToolkitText}>ADD TO TOOLKIT</Text>
                        <Icon
                        type='font-awesome'
                        name='plus'
                        color='#fff' />
                        <Icon
                        type='font-awesome'
                        name='briefcase'
                        color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.shareTouchable}
                        onPress={() => 
                            ShareResource(
                                resource.name,
                                resource.url
                            )}
                    >
                        <Text style={styles.shareText}>SHARE RESOURCE</Text>
                        <Icon
                        type='font-awesome'
                        name='share'
                        color='#fff' />
                        <Icon
                        type='font-awesome'
                        name='file'
                        color='#fff' />
                    </TouchableOpacity>
                </View>
                <ListItem
                    onPress={() =>
                    navigation.navigate('ResourceInfo', { resource })
                }>
                    
                    <Avatar 
                        source={{uri: resource.img}}
                        rounded
                    />
                    <ListItem.Content>
                        <ListItem.Title>{resource.name}</ListItem.Title>
                        <ListItem.Subtitle>By: {resource.author}</ListItem.Subtitle>
                        <ListItem.Subtitle>Source: {resource.source}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                </SwipeRow>
            </Animatable.View>
        );
    };
    return(
        <>
        <ListItem
            containerStyle={{backgroundColor: 'lightgray', justifyContent: 'center'}}
            onPress={() => setShowAddResourceModal(!showAddResourceModal)}>
            <Icon
                name='plus'
                type='font-awesome'
                color='gray'
            />
            <Icon
                name='file'
                type='font-awesome'
                color='gray'
            />
            <Text style={styles.addResource}>NEW RESOURCE</Text>
        </ListItem>
        <FlatList
            data={resources.resourcesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}

        />
        <Modal
            animationType='slide'
            transparent={false}
            visible={showAddResourceModal}
            style={{margin: 10}}
            onRequestClose={() => setShowAddResourceModal(!showAddResourceModal)}
        >
            <ImageBackground
                source={confetti}
                style={{width: '100%', height: '100%'}} 
        >
                <ScrollView>
                    <View style={styles.modal}>
                        <Text style={styles.modalHeader}>Add New Resource</Text>
                        <View style={styles.formContainer}>
                            <View style={styles.formRow}>
                                <Text style={styles.formLabel}>
                                    Title:
                                </Text>
                                <TextInput
                                    width='95%'                                
                                    style={styles.textInput}
                                    placeholder='Resource Name'
                                    onChangeText={(name) => setName(name)}
                                    value={name}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <Text style={styles.formLabel}>
                                    Author:
                                </Text>
                                <TextInput
                                    width='95%'
                                    style={styles.textInput}
                                    placeholder='Resource Author'
                                    onChangeText={(author) => setAuthor(author)}
                                    value={author}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <Text style={styles.formLabel}>
                                    Source:
                                </Text>
                                <TextInput
                                    width='95%'
                                    style={styles.textInput}
                                    placeholder='Source'
                                    onChangeText={(source) => setSource(source)}
                                    value={source}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <Text style={styles.formLabel}>
                                    URL:
                                </Text>
                                <TextInput
                                    width='95%'
                                    style={styles.textInput}
                                    placeholder='Resource URL'
                                    onChangeText={(url) => setUrl(url)}
                                    value={url}
                                />
                            </View>
                            <View style={styles.formButtons}>
                                <Button
                                    onPress={() => handleSubmit()}
                                    title='ADD RESOURCE'
                                    accessibilityLabel='Tap me to add your resource to the directory.'
                                    buttonStyle={{margin: 2, backgroundColor: '#1ab4d2'}}
                                />
                            
                                <Button
                                    onPress={() => {
                                        setShowAddResourceModal(!showAddResourceModal);
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
    );
};

const styles = StyleSheet.create({
 
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

    addResource: {
        color: "gray",
        fontSize: 24,
        fontWeight: 'bold'
      },
    toolkitTouchable: {
        backgroundColor: '#1ab4d2',
        height: '100%',
        justifyContent: 'center'
    },
    addToToolkitView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    addToToolkitText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 14,
        width: 100
    },
    shareTouchable: {
        backgroundColor: 'gray',
        height: '100%',
        justifyContent: 'center'
    },
    shareText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 14,
        width: 100
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
    }
    });


export default DirectoryScreen;