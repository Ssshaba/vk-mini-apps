import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Panel, PanelHeader, Group, CardGrid, ContentCard, Div, Epic, Tabbar, TabbarItem, Text} from '@vkontakte/vkui';
import {Icon28CalendarOutline, Icon28FavoriteOutline, Icon16DonateOultine, Icon20ShareOutline, Icon28UserCircleOutline} from "@vkontakte/icons";
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
                            padding: '1px 20px',
                            marginLeft: '20px'
                        }}>
                        <Icon16DonateOultine style={{ color: 'white', width: '20px', height: '20px' }} />
                        <Text weight="2" style={{ color: 'white', fontSize: '17px', paddingLeft: '5px' }}>0</Text>
                    </div>
                }>Мероприятия
                </PanelHeader>
                <Group style={{marginBottom: '30px', paddingBottom: '30px'}}>
                        {events.map((event) => (
                            <Div key={event.id} style={{  display: 'flex', justifyContent: 'center' }}>
                                <ContentCard
                                    style={{width: '100%', objectFit: 'cover', height: '350' }}
                                    maxHeight={350}
                                    key={event.id}
                                    onClick={() => handleEventClick(event.id)}
                                    src={event.image}
                                    header={<div style={{ fontSize: '17px', fontWeight: 'bold' }}>{event.name}</div>}
                                    caption={
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <div>
                                            <Text>{`Дата:  ${event.date}`}</Text>
                                          </div>
                                          <Div style={{ paddingTop: '5px' }} onClick={(e) => { e.stopPropagation(); handleGetFriendsClick(); }}>
                                            <Icon20ShareOutline style={{marginTop: '8px'}}/>
                                          </Div>
                                        </div>
                                    }
                                />
                            </Div>
                        ))}
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
                    <TabbarItem
                        onClick={go}
                        data-to="profile"
                        selected={id === 'profile'}
                        text="Профиль">
                        <Icon28UserCircleOutline />
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

