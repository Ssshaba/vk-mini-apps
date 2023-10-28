import React from 'react';
import PropTypes from 'prop-types';

import {
    ContentCard, Epic,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Tabbar,
    TabbarItem,
    View
} from '@vkontakte/vkui';

import './styles/Persik.css';
import bridge from "@vkontakte/vk-bridge";
import {Icon28CalendarOutline, Icon28FavoriteOutline, Icon28ShareOutline} from "@vkontakte/icons";


const MyEvent = ({id, go, activePanel}) => {
    const [activeStory, setActiveStory] = React.useState('services');


    const handleGetFriendsClick = async () => {
        try {
            // const tokenData = await bridge.send('VKWebAppGetAuthToken', {
            // 	app_id: 51766180,
            // 	scope: 'friends,status',
            // });

            const friendsData = await bridge.send('VKWebAppShare', {
                link: 'https://vk.com/app51766180',
            });
            console.log(tokenData);
            setFriends(friendsData.items);
        } catch (error) {
            console.error(error);
        }
    };

    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

    return (
        <Epic activeStory={id}>
            <View id={id} activePanel={id}>
                <Panel id={id}>
                    <PanelHeader before={<PanelHeaderBack onClick={go} data-to="event"/>}
                    >Мои мероприятия</PanelHeader>
                    <Group>
                        <ContentCard
                            onClick={() => {
                            }}
                            src="https://sun9-60.userapi.com/impg/ccmgX-gJ-m0fPJXlHO0d86cHSRibUIokc-18UQ/N2zUXK0pTlA.jpg?size=2560x1920&quality=95&sign=77d1b76e641767ae09b42069901e041c&type=album"
                            header="Международная образовательная площадка “Территория Коммуникации”"
                            caption={
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        <p>Дата: 2023-10-22 16:00</p>
                                    </div>
                                    <div style={{paddingTop: '5px'}} onClick={handleGetFriendsClick}>
                                        <Icon28ShareOutline/>
                                    </div>
                                </div>
                            }
                            maxHeight={150}
                            width="100%" // Сделать карточку на всю ширину экрана
                        />
                    </Group>
                    <Tabbar>
                        <TabbarItem
                            onClick={go}
                            data-to="home"
                            selected={id === 'home'}
                            text="Все Мероприятия"
                        />
                        <TabbarItem
                            onClick={go}
                            data-to="myevent"
                            selected={id === 'myevent'}
                            text="Мои мероприятия"
                        />
                    </Tabbar>
                </Panel>
            </View>
        </Epic>
    );

}


MyEvent.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default MyEvent;
