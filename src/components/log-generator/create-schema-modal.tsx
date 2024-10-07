import React from 'react';
import {Button, Form, Input, Modal, ModalProps, Space,} from "@arco-design/web-react";
import useForm from "@arco-design/web-react/es/Form/useForm";
import {IconArrowFall, IconArrowRise, IconDelete} from "@arco-design/web-react/icon";
import KeyTypeInput, {keyTypeInputValidator} from "./key-type-input";

interface CreateSchemaModalProps extends ModalProps {
}

const CreateSchemaModal: React.FC<CreateSchemaModalProps> = (props) => {
    const [form] = useForm()
    const {...modalProps} = props

    const handleModalOk = async () => {
        try {
            const formData = await form.validate()
            console.log(`🐱 formData (Type: ${typeof formData}):\n`, formData);
        } catch (error) {
            console.error(error, "unable to acquire form data")
        }
    }

    return (
        <>
            <Modal onConfirm={() => void handleModalOk()} title='Create Log Schema' {...modalProps}>
                <Form
                    className='w-[600px]'
                    form={form}
                    autoComplete='off'
                >
                    <Form.Item label='Code' field='Code' className='w-[360px]'>
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Form.List
                            rules={[
                                {
                                    validator(v, cb) {
                                        if (v?.length && v.length < 1) {
                                            return cb('At least one pairing has to be configured');
                                        }
                                        return cb();
                                    },
                                },
                            ]}
                            field="KeyTypes"
                        >
                            {(fields, {add, remove, move}) => {
                                return (
                                    <div>
                                        {fields.map((item, index) => {
                                            return (
                                                <div className='flex' key={item.key}>
                                                    <Form.Item
                                                        field={item.field}
                                                        label={'Key Type-' + (index)}
                                                        className='w-[360px]'
                                                        rules={[
                                                            {
                                                                required: true,
                                                                validator:keyTypeInputValidator
                                                            },
                                                        ]}
                                                    >
                                                        <KeyTypeInput/>
                                                    </Form.Item>

                                                    <Button
                                                        icon={<IconDelete/>}
                                                        shape='circle'
                                                        status='danger'
                                                        className='mx-5'
                                                        onClick={() => remove(index)}
                                                    ></Button>
                                                    <Button
                                                        shape='circle'
                                                        onClick={() => move(index, index > 0 ? index - 1 : index + 1)}
                                                    >
                                                        {index > 0 ? <IconArrowRise/> : <IconArrowFall/>}
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                        <Space size={20}>
                                            <Button
                                                onClick={() => {
                                                    add();
                                                }}
                                            >
                                                Add Key Type
                                            </Button>
                                        </Space>
                                    </div>
                                );
                            }}
                        </Form.List>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateSchemaModal;