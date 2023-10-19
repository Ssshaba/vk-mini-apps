import React from 'react';
import { View, Panel, PanelHeader, Group, List, Cell, Avatar } from '@vkontakte/vkui';

const ParticipantsList = () => {
    const participants = [
        { id: 1, name: 'John', photo: 'URL_TO_PHOTO_1' },
        { id: 2, name: 'Alice', photo: 'URL_TO_PHOTO_2' },
        { id: 3, name: 'Bob', photo: 'URL_TO_PHOTO_3' },
        // Добавьте остальных участников
    ];

    return (
        <View activePanel="list">
            <Panel id="list">
                <PanelHeader>Список участников</PanelHeader>
                <Group>
                    <List>
                        {participants.map((participant) => (
                            <Cell
                                key={participant.id}
                                before={<Avatar src={participant.photo} size={48} />}
                            >
                                {participant.name}
                            </Cell>
                        ))}
                    </List>
                </Group>
            </Panel>
        </View>
    );
};

export default ParticipantsList;
