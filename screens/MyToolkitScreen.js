import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';

const myToolkitScreen = ({ navigation }) => {
    const { resourcesArray, isLoading, errMess } = useSelector(
        (state) => state.resources
    );

    const myToolkitResources = useSelector((state) => state.myToolkitResources);

    const renderMyToolkitResource = ({ item: resource }) => {
        return(
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

export default myToolkitScreen;