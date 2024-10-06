import React from 'react';
import {Form, Modal, ModalProps, } from "@arco-design/web-react";
import KeyTypeInput from "./key-type-input";
import useForm from "@arco-design/web-react/es/Form/useForm";

interface CreateSchemaModalProps extends ModalProps {
}

const CreateSchemaModal: React.FC<CreateSchemaModalProps> = (props) => {
    const [form] = useForm()
    const {...modalProps} = props

    const handleModalOk =async  ()=>{
        const formData = await form.validate()
        console.log(`🐱 formData (Type: ${typeof formData}):\n`, formData);
    }

    return (
        <>
            <Modal onConfirm={()=>void handleModalOk()} title='Create Log Schema' {...modalProps}>
                <Form form={form}>
                    <Form.Item label='key type' field='test'>
                        <KeyTypeInput/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateSchemaModal;