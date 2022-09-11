import RenderResource from '../features/resources/RenderResource';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { toggleAddToToolkit } from '../features/myToolkit/myToolkitSlice';


const ResourceInfoScreen = ({ route }) => {
    const { resource } = route.params;
    const notes = useSelector((state) => state.notes);
    const myToolkitResources = useSelector((state) => state.myToolkitResources);
    const dispatch = useDispatch();

    const renderNoteItem = ({ item}) => {
        return(
            <View style={styles.noteItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={notes.notesArray.filter(
                (note) => note.resourceId === resource.id
            )}
            renderItem={renderNoteItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
            ListHeaderComponent={
            <>
                <RenderResource 
                    resource={resource} 
                    inToolkit={myToolkitResources.includes(resource.id)}
                    addToToolkit={() => dispatch(toggleAddToToolkit(resource.id))}
                    />
                <Text style={styles.notesTitle}>Notes</Text>
            </>
            }
        />
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    }
});

export default ResourceInfoScreen;