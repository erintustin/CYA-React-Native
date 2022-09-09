import RenderResource from '../features/resources/RenderResource';

const ResourceInfoScreen = (props) => {
    return (
    <RenderResource resource={props.resource}/>   
    );
};

export default ResourceInfoScreen;