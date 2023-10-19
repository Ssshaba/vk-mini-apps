import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader, Button, Div } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import ParticipantsList from "./components/ParticipantsList";


const Share = ({ id, go }) => {
    const handleGetFriendsClick = async () => {
        try {
            const tokenData = await bridge.send('VKWebAppGetAuthToken', {
                app_id: 51766180,
                scope: 'friends,status',
            });

            const friendsData = await bridge.send('VKWebAppShare', {
                link: 'https://vk.com/app51766180',
            });
            console.log(tokenData);
            setFriends(friendsData.items);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View id={id} activePanel={id}>
            <Panel id={id}>
                <PanelHeader>Share Example</PanelHeader>
                <Div>
                    <Button stretched size="l" onClick={handleGetFriendsClick}>
                        Поделиться
                    </Button>

                    <ParticipantsList />
                </Div>
            </Panel>
        </View>
    );
};

Share.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Share;
