import RenderResource from '../features/resources/RenderResource';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Text, View, Modal, Button, TouchableOpacity, Alert, Share} from 'react-native';
import { TextInput } from 'react-native';
import { postNote, deleteNote} from '../features/notes/notesSlice';
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
        resetForm();
    };
    
    const resetForm = () => {
        setText('');
    };

    const ShareResourceWithNote = (title, note, url) => {
        Share.share(
            {
                title,
                message: `${note} ${title}`,
                url
            },
            {
                dialogTitle: 'Share ' + title + ' with note'
            }
        )
    };

    const renderNoteItem = ({ item }) => {
        return(
            <>
                <Text style={styles.notesTitle}>Notes</Text>
                <View style={styles.notesContainer}>
                    <View style={styles.note}>
                        <Text style={styles.noteItem}>{item.text}</Text>
                            <View style={styles.noteButtonContainer}>
                                <TouchableOpacity
                                    style={styles.noteButtons}
                                        onPress={() => 
                                            ShareResourceWithNote(
                                                resource.name,
                                                item.text,
                                                resource.url
                                            )}
                                >
                                    <Text style={styles.shareText}>SHARE WITH NOTE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.noteButtons}
                                    onPress={() =>
                                        Alert.alert(
                                            'Delete this Note?',
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
                                    <Text style={styles.deleteText}>DELETE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
                </>
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

    notesContainer: {
        backgroundColor: '#fff',
        padding: 5,
        borderWidth: 1,
        margin: 35,
        marginTop: -1,
        marginBottom: 2
    },
    notesTitle: {
        textAlign: 'center',
        backgroundColor: '#1ab4d2',
        fontSize: 24,
        fontFamily: 'GochiHand_400Regular',
        color: '#43484D',
        padding: 2,
        margin: 35,
        marginBottom: 0,
        borderWidth: 1
    },

    note: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        margin: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noteItem: {
        width: '100%',
        fontSize: 16,
    },

    noteButtonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    noteButtons: {
        width: '50%',
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 0,
        alignItems: 'center'
        
    },
    deleteText: {
        color: 'white',
        backgroundColor: '#f75832',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 12,
        width: 60,
        padding: 5,
        margin: 5
    },
    shareText: {
        color: 'white',
        backgroundColor: '#1ab4d2',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 12,
        width: 130,
        padding: 5,
        margin: 5
    },
});

export default ResourceInfoScreen;