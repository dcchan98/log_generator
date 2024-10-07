import React from 'react';
import {Input, Select} from "@arco-design/web-react";


type JsonType = 'string' | 'number' | 'boolean' | 'list' | 'object'

function isJsonType(type: string): type is JsonType {
    return ['string', 'number', 'boolean', 'list', 'object'].includes(type);
}

type KeyJsonType = {
    key: string; // 🐱
    jsonType: JsonType
};


interface KeyTypeInputProps {
    onChange?: (newKeyJsonTypeValue: KeyJsonType) => void;
    value?: KeyJsonType
}

export function keyTypeInputValidator(value: KeyJsonType | undefined, cb: (msg?: string) => void) {
    if (!value){
        return cb('key type input cannot be empty')
    }
    if (!value.key || value.key === '') {
        return cb('key has to be entered');
    }
    if (!value.jsonType || !isJsonType(value.jsonType)) {
        return cb('choose valid json type');
    }
    return cb();
}

const Option = Select.Option;
const options: JsonType[] = ['string', 'number', 'boolean', 'list', 'object'];

const KeyTypeInput: React.FC<KeyTypeInputProps> = (props) => {
    const {value, onChange} = props

    const handleChange = (newValue: KeyJsonType) => {
        onChange && onChange(newValue);
    };

    const mustValue = value ?? {jsonType: "string", key: ""}

    return (
        <div className='flex gap-3 items-center'>
            <Input style={{width: 100}} value={mustValue?.key} onChange={val => handleChange({...mustValue, key: val})}
                   placeholder='enter json key'/>
            <Select style={{width: 100}} value={mustValue?.jsonType}
                    onChange={val => handleChange({...mustValue, jsonType: val})} placeholder='select json type'>
                {options.map((option) => (
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default KeyTypeInput;