import RenderResource from '../features/resources/RenderResource';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Text, View, Modal, Button, TouchableOpacity, Alert} from 'react-native';
import { TextInput } from 'react-native';
import { postNote, deleteNote, editNote } from '../features/notes/notesSlice';
import { toggleAddToToolkit } from '../features/myToolkit/myToolkitSlice';
import { useState } from 'react';

import * as Animatable from 'react-native-animatable';


const ResourceInfoScreen = ({ route }) => {
    const { resource } = route.params;
    const notes = useSelector((state) => state.notes);
    const myToolkitResources = useSelector((state) => state.myToolkitResources);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
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

    const handleEdit = () => {
        
        dispatch(editNote());
        setShowEditModal(!showEditModal);
    }
    
    const resetForm = () => {
        setText('');
    };

    const renderNoteItem = ({ item}) => {
        return(
            <>
            <View style={styles.note}>
                <Text style={styles.noteItem}>{item.text}</Text>
            <TouchableOpacity
                style={styles.noteButtons}
                onPress={() =>
                    Alert.alert(
                        'Delete from Toolkit?',
                        'Are you sure you wish to delete this note?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () =>
                                    console.log(
                                        'note not deleted'
                                    ),
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress:() => 
                                    dispatch(
                                        deleteNote()
                                    )
                            }
                        ],
                        {cancelable: false}
                    )
                }
            >
                <Text style={styles.deleteText}>DELETE NOTE</Text>
            </TouchableOpacity>
            </View>
           </> 
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
                ListFooterComponent={
                    <TouchableOpacity
                    style={styles.noteButtons}
                        onPress={() => setShowModal(!showModal)
                            
                        }
                    >
                        <Text style={styles.addNoteText}>ADD NOTE</Text>
                    </TouchableOpacity>
                }
                
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                style={{margin: 10}}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalHeader}>Add Notes</Text>
                    <TextInput
                        multiline
                        numberOfLines={15}
                        width='95%'
                        style={{
                            margin: 10,
                            marginTop: -9,
                            backgroundColor: '#fff',
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
        padding: 10,
        textAlign: 'center',
        fontFamily: 'GochiHand_400Regular',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 7,
        marginBottom: 0
      },

    notesTitle: {
        textAlign: 'center',
        backgroundColor: '#1ab4d2',
        fontSize: 24,
        fontFamily: 'GochiHand_400Regular',
        color: '#43484D',
        padding: 10,
        margin: 15,
        marginBottom: 0,
        borderRadius: 10,
        borderWidth: 1
    },
    note: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        margin: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    noteItem: {
        width: '100%',
        fontSize: 18
    },
    noteButtons: {
        width: '100%',
        margin: 10,
        alignItems: 'center',
    },
    deleteText: {
        color: 'white',
        backgroundColor: '#f75832',
        borderRadius: 10,
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 14,
        width: 120,
        padding: 5
    },
    addNoteText: {
        color: 'white',
        backgroundColor: 'gray',
        borderRadius: 10,
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 20,
        width: 150,
        padding: 5
    },
    editText: {
        color: '#1ab4d2',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 75
    }
});

export default ResourceInfoScreen;