import { useState } from "react";
import { View } from 'react-native';
import { RESOURCES } from '../shared/RESOURCES';
import DirectoryScreen from './DirectoryScreen';
import ResourceInfoScreen from './ResourceInfoScreen';

const Main = () => {
    const [resources, setResources] = useState(RESOURCES);
    const [selectedResourceId, setSelectedResourceId] = useState();

    return (
        <View style={{ flex: 1 }}>
            <DirectoryScreen 
                resources={resources}
                onPress={(resourceId) => setSelectedResourceId(resourceId)}
            />
            <ResourceInfoScreen
                    resource={
                        resources.filter(
                            (resource) => resource.id === selectedResourceId
                        )[0]
                    }
                />
        </View>
    );
};

export default Main;