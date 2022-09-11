import RenderResource from '../features/resources/RenderResource';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NOTES }from '../shared/NOTES';

const ResourceInfoScreen = ({ route }) => {
    const { resource } = route.params;
    const [notes, setNotes ] = useState(NOTES);
    const [addToToolkit, setAddToToolkit] = useState(false);

    const renderNoteItem = ({ item}) => {
        return(
            <View style={styles.noteItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={notes.filter(
                (note) => note.resourceId === resource.id
            )}
            renderItem={renderNoteItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
            ListHeaderComponent={
            <>
                <RenderResource 
                    resource={resource} 
                    inToolkit={resource.inToolkit}
                    addToToolkit={() => setAddToToolkit(true)}
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