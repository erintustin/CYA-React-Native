import { FlatList } from 'react-native';
import {Avatar, ListItem } from 'react-native-elements';
import { useState } from 'react';
import { RESOURCES } from '../shared/RESOURCES';

const DirectoryScreen = ({ navigation }) => {
    const [resources, setResources] = useState(RESOURCES);

    const renderDirectoryItem = ({item: resource}) => {
        return(
            <ListItem 
                onPress={() => navigation.navigate('ResourceInfo', {resource})}
                >
                <Avatar 
                    source={resource.img}
                    rounded
                />
                <ListItem.Content>
                    <ListItem.Title>{resource.name}</ListItem.Title>
                    <ListItem.Subtitle>By: {resource.author}</ListItem.Subtitle>
                    <ListItem.Subtitle>Source: {resource.source}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    return(
        <FlatList
            data={resources}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}

        />
    );

};

export default DirectoryScreen;