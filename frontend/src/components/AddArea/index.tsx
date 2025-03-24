import { useState, KeyboardEvent } from 'react';
import * as C from './styles';

type Props = {
    onEnter: (taskTitle: string) => void;
}

export const AddArea = ({ onEnter }: Props) => {
    const [title, setTitle] = useState('');

    const handleAddTask = () => {
        if (title.trim() !== '') {
            onEnter(title);
            setTitle('');
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <C.Container>
            <div className="image" onClick={handleAddTask}>➕</div>
            <div className="inputs">
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
            </div>
        </C.Container>
    );
};
