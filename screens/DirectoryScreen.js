import { FlatList, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading  from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';

const DirectoryScreen = ({ navigation }) => {
    const resources = useSelector((state) => state.resources);

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
                        source={{uri: baseUrl + resource.img}}
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
        <FlatList
            data={resources.resourcesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}

        />
    );

};

export default DirectoryScreen;