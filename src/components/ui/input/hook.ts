import { KeyboardEvent, useState } from 'react'
import { IPROPS } from './type';

export default function useHook(props: IPROPS) {

    const { type } = props;

    const [newType, changeType] = useState(type);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.altKey && (e.key === 'p' || e.key === 'P')) {
            handlePasswordVisibilty()
        }
    };

    const handlePasswordVisibilty = () => {
        changeType((prev) => (prev === 'password' ? 'text' : 'password'))
    }

    return { newType, handleKeyDown, handlePasswordVisibilty }

}
