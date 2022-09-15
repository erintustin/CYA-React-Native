import { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, Button } from 'react-native';

const NewResourceForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [source, setSource] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = () => {
        console.log("title: " + title);
        console.log("author: " + author);
        console.log("source: " + source);
        console.log("url: " + url);

        setTitle('');
        setAuthor('');
        setSource('');
        setUrl('');
    };

    return(
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>
                    Title:
                </Text>
                <TextInput
                    width='95%'
                    style={styles.textInput}
                    placeholder='Resource Title'
                    onChangeText={(title) => setTitle(title)}
                    value={title}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>
                    Author:
                </Text>
                <TextInput
                    width='95%'
                    style={styles.textInput}
                    placeholder='Resource Author'
                    onChangeText={(author) => setAuthor(author)}
                    value={author}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>
                    Source:
                </Text>
                <TextInput
                    width='95%'
                    style={styles.textInput}
                    placeholder='Source'
                    onChangeText={(source) => setSource(source)}
                    value={source}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>
                    URL:
                </Text>
                <TextInput
                    width='95%'
                    style={styles.textInput}
                    placeholder='Resource URL'
                    onChangeText={(url) => setUrl(url)}
                    value={url}
                />
            </View>
            <View style={styles.formRow}>
            <Button
                onPress={() => handleSubmit()}
                title='Add Resource'
                color='#1ab4d2'
                accessibilityLabel='Tap me to add your resource to the directory.'
            />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    formLabel: {
        fontSize: 16,
        flex: 2,
        fontWeight: '700'
    },
    textInput: {
        width: '80%',
        margin: 5,
        marginTop: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        padding: 5,

    }
});

export default NewResourceForm;


