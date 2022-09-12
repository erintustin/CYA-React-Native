import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleAddToToolkit } from '../features/myToolkit/myToolkitSlice';

const myToolkitScreen = () => {
    const { resourcesArray, isLoading, errMess } = useSelector(
        (state) => state.resources
        );
    const myToolkitResources = useSelector((state) => state.myToolkitResources);
    const dispatch = useDispatch();

    const renderMyToolkitResource = ({ item: resource }) => {
        return(
            <SwipeRow rightOpenValue={-100}>
                <View style={styles.deleteView}>
                    <TouchableOpacity 
                        style={styles.deleteTouchable}
                        onPress={() => dispatch(toggleAddToToolkit(resource.id))}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem
                        onPress={() =>
                        navigation.navigate('Directory', {
                            screen: 'ResourceInfo',
                            params: { resource }
                            })
                        }
                    >
                        <Avatar 
                            rounded
                            source={{ uri: baseUrl + resource.img }} 
                        />
                        <ListItem.Content>
                            <ListItem.Title>{resource.name}</ListItem.Title>
                            <ListItem.Subtitle>By: {resource.author}</ListItem.Subtitle>
                            <ListItem.Subtitle>Source: {resource.source}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        );
    };
    
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }

    return(
        <FlatList  
            data={resourcesArray.filter((resource) =>
                myToolkitResources.includes(resource.id)
            )}
            renderItem={renderMyToolkitResource}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default myToolkitScreen;