import RenderResource from '../features/resources/RenderResource';

const ResourceInfoScreen = ({ route }) => {
    const { resource } = route.params;

    return (
    <RenderResource resource={resource}/>   
    );
};

export default ResourceInfoScreen;