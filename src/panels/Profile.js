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


const Profile = ({ id, go }) => {
    const [userPhoto, setUserPhoto] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await bridge.send('VKWebAppGetUserInfo');
                setUserPhoto(userData.photo_100);
            } catch (error) {
                console.error('Ошибка при получении информации о пользователе:', error);
            }
        };

        fetchUserInfo();
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
                                padding: '0px 20px',
                                marginLeft: '20px'
                            }}>
                        <Icon20DonateOutline style={{ color: 'white', width: '20px', height: '20px' }} />
                        <Text weight="2" style={{ color: 'white', fontSize: '17px', paddingLeft: '5px' }}>0</Text>
                    </div>
                }>Профиль
                </PanelHeader>

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
                            <Icon28CalendarOutline />
                        </TabbarItem>
                    </Tabbar>
                </Panel>
            </View>
        </Epic>
    );

}


Profile.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Profile;
