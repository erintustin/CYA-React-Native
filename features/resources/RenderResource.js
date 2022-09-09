import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

const RenderResource = ({ resource }) => {
    if (resource) {
        return (
            <Card containerStyle={{ padding: 0 }}>
               
                        <Text style={{
                            color: 'black',
                            textAlign: 'center',
                            fontSize: 25 }}
                        >
                            {resource.name}
                        </Text>
                   
                <Card.Image source={resource.img}>
                
                </Card.Image>
                <Text style={{ margin: 20 }}>By: {resource.author}</Text>
                <Text style={{ margin: 20 }}>Source: {resource.source}</Text>
            </Card>
        );
    }
        return (
        <View />);
        
};

export default RenderResource;