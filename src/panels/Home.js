import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Panel, PanelHeader, Group, CardGrid, ContentCard, Div, Epic, Tabbar, TabbarItem} from '@vkontakte/vkui';
import {Icon28CalendarOutline, Icon28FavoriteOutline, Icon28DonateOutline, Icon24ShareOutline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

const Home = ({id, go, fetchedUser,  handleEventClick}) => {
    const [events, setEvents] = useState([]);
    const [activeStory, setActiveStory] = React.useState('main');


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

    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);

    useEffect(() => {
        // Отправляем GET-запрос для получения данных
        fetch('https://persikivk.ru/api/event')
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error('Ошибка при загрузке данных:', error));
    }, []);

    return (
        <Epic activeStory={id}>
        <View id={id} activePanel={id}>
            <Panel id={id}>
                <PanelHeader style={{ fontSize: '21px'}} before={
                    <div onClick={go} data-to="score"
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
                }>Мероприятия
                </PanelHeader>
                <Group style={{marginBottom: '30px', paddingBottom: '30px'}}>
                    <CardGrid size="2" style={{ justifyContent: 'center', width: '95vw'}}>
                        {events.map((event) => (
                            <Div key={event.id} style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                                <ContentCard style={{minWidth: '90vw'}}
                                    imageStyle={{ objectFit: 'cover', height: '350' }}
                                    maxHeight={350}
                                    key={event.id}
                                    onClick={() => handleEventClick(event.id)}
                                    src={event.image}
                                    header={<div style={{ fontSize: '17px', fontWeight: 'bold' }}>{event.name}</div>}
                                    caption={
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div >
                                            <text>{`Дата:  ${event.date}`}</text>
                                        </div>
                                        <Div style={{paddingTop: '5px'}} onClick={e => {
                                            e.stopPropagation(); // Предотвращение срабатывания onClick родительской карточки
                                            handleGetFriendsClick(); // Вызов вашей функции
                                            }}>
                                            <Icon24ShareOutline/>
                                        </Div>
                                    </div>
                                    }
                                />
                            </Div>
                        ))}
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
};

Home.propTypes = {
    id: PropTypes.string.isRequired,

    handleEventClick: PropTypes.func,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;

