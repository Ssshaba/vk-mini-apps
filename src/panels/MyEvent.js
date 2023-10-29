import React from 'react';
import PropTypes from 'prop-types';

import {
    CardGrid,
    ContentCard,
    Div,
    Epic,
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
import {Icon28CalendarOutline, Icon28FavoriteOutline, Icon28DonateOutline, Icon24ShareOutline} from "@vkontakte/icons";


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
                    <PanelHeader style={{ fontSize: '21px'}} before={
                    <div onClick={go} data-to="event"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 'auto', // Автоматический размер под контент
                            height: '30px',
                            border: '2px solid #4CD964',
                            //borderImage: 'linear-gradient(to right, #f6b73c, #4d9f0c) 30',
                            borderRadius: '9px',
                            padding: '0px 15px', // Отступы внутри кнопки
                            marginLeft: '20px'
                        }}>
                        <Icon28DonateOutline style={{color: '#4CD964', width: '20px', height: '20px' }}/>
                        <text weight="2" style={{ color: 'black', fontSize: '17px', paddingBottom: '3px', paddingLeft: '5px' }}>0</text>
                    </div>
                }>Мой выбор
                </PanelHeader>
                    <Group style={{marginBottom: '30px', paddingBottom: '30px'}}>
                        <CardGrid size="2" style={{ justifyContent: 'center', width: '95vw'}}>
                            <Div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                                <ContentCard 
                                    imageStyle={{ objectFit: 'cover', height: '350' }}
                                    maxHeight={350}
                                    onClick={() => {
                                    }}
                                    src="https://sun9-60.userapi.com/impg/ccmgX-gJ-m0fPJXlHO0d86cHSRibUIokc-18UQ/N2zUXK0pTlA.jpg?size=2560x1920&quality=95&sign=77d1b76e641767ae09b42069901e041c&type=album"
                                    header="Международная образовательная площадка “Территория Коммуникации”"
                                    caption={
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div >
                                            <text>{'Дата: 2023-10-22 16:00'}</text>
                                        </div>
                                        <Div style={{paddingTop: '5px'}} onClick={handleGetFriendsClick}>
                                            <Icon24ShareOutline/>
                                        </Div>
                                    </div>
                                    }
                                />
                            </Div>
                        </CardGrid>
                    </Group>
                    <Tabbar style={{ position: 'fixed', bottom: 0, width: '100%' }}>
                        <TabbarItem
                            onClick={go}
                            data-to="home"
                            selected={id === 'home'}
                            text="Мероприятия">
                            <Icon28CalendarOutline />
                        </TabbarItem>
                        <TabbarItem
                            onClick={go}
                            data-to="myevent"
                            selected={id === 'myevent'}
                            text="Мой выбор">
                            <Icon28FavoriteOutline />
                        </TabbarItem>
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
