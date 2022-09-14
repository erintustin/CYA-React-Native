import { FlatList, Text, View, Modal, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Loading  from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleAddToToolkit } from '../features/myToolkit/myToolkitSlice';

const DirectoryScreen = ({ navigation }) => {
    const resources = useSelector((state) => state.resources);
    const [showAddResourceModal, setShowAddResourceModal] = useState(false);
    const dispatch = useDispatch();
    const myToolkitResources = useSelector((state) => state.myToolkitResources);

    if (resources.isLoading) {
        return <Loading />;
    }
    if (resources.errMess) {
        return (
            <View>
                <Text>{resources.errMess}</Text>
            </View>
        );
    }

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
        )}};
        
        return(
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                <SwipeRow rightOpenValue={-100}>
                <View style={styles.addToToolkitView}>
                    <TouchableOpacity 
                        style={styles.toolkitTouchable}
                        onPress={() => addToToolkit()}
                    >
                        <Text style={styles.addToToolkitText}>Add to Toolkit</Text>
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
                <View style={styles.modal}>
                    <Text style={styles.modalHeader}>Add Notes</Text>
                    
                    
                </View>
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
        borderRadius: 10,
        fontSize: 30,
        padding: 10,
        textAlign: 'center',
        fontFamily: 'GochiHand_400Regular',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 7,
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
        fontSize: 16,
        width: 100
    },
    });


export default DirectoryScreen;