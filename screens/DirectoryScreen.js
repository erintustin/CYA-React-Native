import { FlatList, Text, View, Modal, StyleSheet, TextInput } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Loading  from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';

const DirectoryScreen = ({ navigation }) => {
    const resources = useSelector((state) => state.resources);
    const [showAddResourceModal, setShowAddResourceModal] = useState(false);

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
        return(
            <Animatable.View animation='fadeInRightBig' duration={2000}>
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
      }
    });


export default DirectoryScreen;