import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

const RenderResource = ({ resource }) => {
    if (resource) {
        return (
            <Card 
                containerStyle={{ padding: 0 }}
            >
                <Card.Image source={resource.image}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 20 }}
                        >
                            {resource.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{resource.author}</Text>
            </Card>
        )
    }
        return 
            <View />
        
};

export default RenderResource;