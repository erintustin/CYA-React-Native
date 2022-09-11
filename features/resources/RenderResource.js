import { Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';

const RenderResource = (props) => {
    const { resource } = props;
    if (resource) {
        return (
            <Card style={styles.cardContainer}>
               
                        <Text style={{
                            color: 'black',
                            textAlign: 'center',
                            fontSize: 25 }}
                        >
                            {resource.name}
                        </Text>
                   
                <Card.Image source={{uri: baseUrl + resource.img}}>
                
                </Card.Image>
                <Text style={{ margin: 20 }}>By: {resource.author}</Text>
                <Text style={{ margin: 20 }}>Source: {resource.source}</Text>
                <Icon 
                    name={props.inToolkit ? 'minus' : 'plus'}
                    type='font-awesome'
                    color='#1ab4d2'
                    aria-label='add resource'
                    raised
                    reverse
                    onPress={() => props.inToolkit ? console.log ('Already in Toolkit') : props.addToToolkit()}
                    />
            </Card>
        );
    }
        return (
        <View />);
        
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    }
});

export default RenderResource;