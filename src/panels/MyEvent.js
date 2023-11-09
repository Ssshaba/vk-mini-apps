import React, {useEffect, useState} from 'react';
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
    View,
    Text,
    Title
} from '@vkontakte/vkui';

import './styles/Persik.css';
import sadPersik from '../img/sadPersik.png';
import bridge from "@vkontakte/vk-bridge";
import {Icon28CalendarOutline, Icon28FavoriteOutline, Icon20DonateOutline, Icon24ShareOutline} from "@vkontakte/icons";


const MyEvent = ({ id, go, handleMyEventClick }) => {
    const [user, setUser] = useState({});
    const [userEvents, setUserEvents] = useState([]);


    const handleGetFriendsClick = async () => {
        try {

            const friendsData = await bridge.send('VKWebAppShare', {
                link: 'https://vk.com/app51766180',
            });
            console.log(tokenData);
            setFriends(friendsData.items);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);

            const userId = user.id;
            const response = await fetch(`https://persikivk.ru/api/event/user-events/${userId}`);
            if (response.ok) {
                const userEventsData = await response.json();
                setUserEvents(userEventsData);
            } else {
                console.error('Ошибка при получении мероприятий пользователя');
            }
        } catch (error) {
            console.error('Ошибка при получении информации о пользователе:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Epic activeStory={id}>
            <View id={id} activePanel={id}>
                <Panel id={id}>
                    <PanelHeader style={{textAlign: 'center'}} before={
                        <div onClick={go} data-to="score"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 'auto',
                                height: '30px',
                                background: 'linear-gradient(to right, #4DDA65, #298FE1)',
                                borderRadius: '9px',
                                boxShadow: '0px 4px 6px rgba(0, 0.3, 0, 0.3)',
                                padding: '0px 15px',
                                marginLeft: '20px'
                            }}>
                        <Icon20DonateOutline style={{color: 'white'}}/>
                        <Text weight="2" style={{ color: 'white', fontSize: '17px', paddingLeft: '5px' }}>0</Text>
                    </div>
                }>Мой выбор
                </PanelHeader>
                    <Group style={{marginBottom: '30px', paddingBottom: '30px'}}>
                        {userEvents.length === 0 ? (
                            <Div style={{textAlign: 'center'}}>
                                <img
                                    src={sadPersik}
                                    alt="Грустный персик"
                                    style={{marginTop: '30px'}}
                                />
                                <Title level="2" weight="demibold">Мероприятия не найдены</Title>
                                <Text weight="regular" style={{marginTop: '15px'}}>У вас пока нет выбранных мероприятий.</Text>
                                <Text weight="regular">Переходите в Мероприятия и участвуйте!</Text>
                            </Div>
                        ) : (
                            userEvents.map(event => (
                                <Div key={event.Event.eventId}>
                                    <ContentCard
                                        style={{minWidth: '90vw', objectFit: 'cover', height: '350' }}
                                        maxHeight={350}
                                        onClick={() => handleMyEventClick(event.Event.id)}
                                        header={event.Event.name}
                                        src={event.Event.image}

                                        caption={
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <div >
                                                    <Text>{`Дата:  ${event.Event.date}`}</Text>
                                                </div>
                                                <Div style={{paddingTop: '5px'}}
                                                     onClick={e => {
                                                    e.stopPropagation(); // Предотвращение срабатывания onClick родительской карточки
                                                    handleGetFriendsClick(); // Вызов вашей функции
                                                }}
                                                >
                                                    <Icon24ShareOutline/>
                                                </Div>
                                            </div>
                                        }
                                    />
                                </Div>
                            ))
                        )}
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
    handleMyEventClick: PropTypes.func,
};

export default MyEvent;
