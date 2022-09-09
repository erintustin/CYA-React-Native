import { FlatList } from 'react-native';
import {Avatar, ListItem } from 'react-native-elements';

const DirectoryScreen = (props) => {
    const renderDirectoryItem = ({item: resource}) => {
        return(
            <ListItem 
                onPress={() => props.onPress(resource.id)}
                >
                <Avatar 
                    source={resource.img}
                    rounded
                />
                <ListItem.Content>
                    <ListItem.Title>{resource.name}</ListItem.Title>
                    <ListItem.Subtitle>{resource.author}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    return(
        <FlatList
            data={props.resources}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}

        />
    );

};

export default DirectoryScreen;