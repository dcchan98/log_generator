import React, {useState} from 'react';
import './App.css';
import CreateSchemaModal from "./components/log-generator/create-schema-modal";
import {Button} from "@arco-design/web-react";

function App() {
    const [createSchemaModalVisible, setCreateSchemaModalVisible] = useState(false)

    return (
        <>
            <Button onClick={() => setCreateSchemaModalVisible(true)}>Create Schema</Button>
            <CreateSchemaModal onCancel={() => setCreateSchemaModalVisible(false)}
                               visible={createSchemaModalVisible}></CreateSchemaModal>
        </>
    );
}

export default App;
