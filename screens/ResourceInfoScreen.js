import RenderResource from '../features/resources/RenderResource';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Text, View, Modal, Button} from 'react-native';
import { TextInput } from 'react-native';
import { postNote } from '../features/notes/notesSlice';
import { toggleAddToToolkit } from '../features/myToolkit/myToolkitSlice';
import { useState } from 'react';

import * as Animatable from 'react-native-animatable';


const ResourceInfoScreen = ({ route }) => {
    const { resource } = route.params;
    const notes = useSelector((state) => state.notes);
    const myToolkitResources = useSelector((state) => state.myToolkitResources);
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const newNote = {
            text,
            resourceId: resource.id
        };
        dispatch(postNote(newNote));
        setShowModal(!showModal);
    };
    
    const resetForm = () => {
        setText('');
    };

    const renderNoteItem = ({ item}) => {
        return(
            <View style={styles.noteItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
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
                        onShowModal={() => setShowModal(!showModal)}
                        />
                    <Text style={styles.notesTitle}>Notes</Text>
                </>
                }
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalHeader}>Notes</Text>
                    <TextInput
                        multiline
                        numberOfLines={20}
                        width='95%'
                        style={{
                            margin: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            padding: 10,
                            }}
                        placeholder='Start typing your notes here.'
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />
                    <View style={{ margin: 5 }}>
                        <Button
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                            color='#1ab4d2'
                            title='Submit'
                        />
                    </View>
                    <View style={{ margin: 5}}>
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='gray'
                            title='Cancel'
                        />
                    </View>
                </View>
            </Modal>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
 
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalHeader: {
        backgroundColor: '#1ab4d2', 
        borderRadius: 10,
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'GochiHand_400Regular',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 0
      },

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