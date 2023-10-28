import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Panel, PanelHeader, Group, CardGrid, ContentCard, Div, Epic, Tabbar, TabbarItem} from '@vkontakte/vkui';
import {Icon28CalendarOutline, Icon28FavoriteOutline, Icon28ShareOutline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import MyEvent from "./MyEvent";

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
                <PanelHeader>Все Мероприятия</PanelHeader>
                <Group style={{marginBottom: '30px', paddingBottom: '30px'}}>
                    <CardGrid size="2">
                        {events.map((event) => (
                            <Div key={event.id} style={{marginBottom: '30px'}}>
                                <ContentCard style={{minWidth: '95vw'}}
                                             key={event.id}
                                             onClick={() => handleEventClick(event.id)}
                                             src={event.image}
                                             header={event.name}
                                             caption={
                                                 <Div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                     <Div>
                                                         <p>{`Дата:  ${event.date}`}</p>
                                                     </Div>
                                                     <Div style={{paddingTop: '5px'}} onClick={e => {
                                                         e.stopPropagation(); // Предотвращение срабатывания onClick родительской карточки
                                                         handleGetFriendsClick(); // Вызов вашей функции
                                                     }}>
                                                         <Icon28ShareOutline/>
                                                     </Div>
                                                 </Div>
                                             }
                                             maxHeight={150}
                                />
                            </Div>
                        ))}
                    </CardGrid>
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

