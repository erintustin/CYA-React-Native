import { useState } from "react";
import RESOURCES from '../shared/RESOURCES';
import DirectoryScreen from './DirectorScreen';

const Main = () => {
    const [resources, setResources] = useState(RESOURCES);

    return (
        <DirectoryScreen resources={resources} />
    )
};

export default Main;