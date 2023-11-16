import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {
    Avatar,
    Button,
    Card,
    CardGrid,
    Cell,
    CellButton,
    ContentCard,
    Div,
    Epic,
    Group,
    Header,
    HorizontalCell,
    HorizontalScroll,
    Image,
    ModalPage,
    ModalRoot,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Tabbar,
    TabbarItem,
    View,
    Text,
    Title,
    Separator,
    Spinner
} from '@vkontakte/vkui';

import './styles/Persik.css';
import BGforProfile from '../img/BGforProfile.png';
import product1 from '../img/product1.png';
import product2 from '../img/product2.png';
import achievement1 from '../img/newachievement1.png';

import bridge from "@vkontakte/vk-bridge";
import {
    Icon28CalendarOutline,
    Icon28FavoriteOutline,
    Icon20DonateOutline,
    Icon28DonateOutline,
    Icon28CrownOutline,
    Icon28UserCircleOutline
} from "@vkontakte/icons";


const Profile = ({id, go}) => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [userFirstName, setUserFirstName] = useState(null);
    const [userLastName, setUserLastName] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalActive, setModalActive] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await bridge.send('VKWebAppGetUserInfo');
                setUserPhoto(userData.photo_100);
                setUserFirstName(userData.first_name);
                setUserLastName(userData.last_name);
            } catch (error) {
                console.error('Ошибка при получении информации о пользователе:', error);
            }
        };

        const fetchUsersData = async () => {
            try {
                const response = await fetch('https://persikivk.ru/api/user/');
                const data = await response.json();
                setUsersData(data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при получении данных пользователей:', error);
                setLoading(false);
            }
        };

        fetchUserInfo();
        fetchUsersData();
    }, []);


    // Функция для открытия камеры
    const openCamera = async () => {
        try {
            const data = await bridge.send('VKWebAppOpenCodeReader');

            if (data.code_data) {

                // Результат сканирования получен
                console.log('Результат сканирования:', data.code_data);

                // Сохраняем результат в локальное хранилище
                await bridge.send('VKWebAppStorageSet', {
                    key: 'qrCodeData',
                    value: data.code_data,
                });

                // Устанавливаем результат в состояние компонента
                setQrCodeData(data.code_data);
                // Здесь вы можете выполнить дополнительные действия с результатом
            } else {
                // Результат сканирования не содержит данных
                console.log('Результат сканирования не содержит данных.');
            }
        } catch (error) {
            // Обработка ошибки
            console.error('Ошибка при открытии сканера кода:', error);
        }
    };

    const renderUsersData = () => {
        if (loading || !usersData || usersData.length === 0) {
            return <Spinner size="medium"/>;
        }

        return usersData.map((user) => (
            <Cell
                key={user.id}
                before={<Avatar src={user.photo100} size={48}/>}
                after={
                    <Div style={{display: 'flex', alignItems: 'center'}}>
                        <Text style={{marginRight: '8px', color: '#2787F5'}}>{`${user.points}`}</Text>
                        <Icon28DonateOutline style={{color: '#4CD964'}}/>
                    </Div>
                }
            >
                {`${user.name}`}
            </Cell>
        ));
    };

    const handleCloseModal = () => {
        console.log('handleCloseModal called');
        setModalActive(null);
    };

    const modal = (
        <ModalRoot activeModal={modalActive}>
            <ModalPage id="shareModal" onClose={() => setModalActive(null)}>
                <Div style={{textAlign: 'center'}}>
                    <Image size={88} borderRadius="l" src={achievement1}/>
                    <Div style={{color: '#4CD964', marginTop: '8px'}}>
                        Ты супер!
                    </Div>
                    <Div style={{color: '#2688EB', marginBottom: '16px'}}>
                        Так держать!
                    </Div>
                </Div>
                <Button size="l" stretched onClick={() => handleCloseModal()} style={{background: '#2688EB'}}>
                    Поделиться в истории
                </Button>
            </ModalPage>
        </ModalRoot>
    );

    const achievementsItems = [
        {
            id: 1,
            title: 'Почуствовал вкус',
            icon_139: achievement1,
        },

    ];

    const AchievementsItems = () => {
        return achievementsItems.map(({id, title, icon_139}) => (
            <HorizontalCell
                key={id}
                size="m"
                header={title}
                style={{whiteSpace: 'normal'}}
                onClick={() =>
                    setModalActive('shareModal')}>
                <Image size={88} borderRadius="l" src={icon_139}/>
            </HorizontalCell>
        ));
    };

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
                            <Icon20DonateOutline style={{color: 'white', width: '20px', height: '20px'}}/>
                            <Text weight="2" style={{color: 'white', fontSize: '17px', paddingLeft: '5px'}}>0</Text>
                        </div>
                    }>Профиль
                    </PanelHeader>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img src={BGforProfile}
                             alt="Задний фон"
                             style={{width: '100%', maxWidth: '100%'}}
                        />
                        <Div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            {userPhoto && <Avatar
                                src={userPhoto}
                                size={100}
                                style={{
                                    border: '3px solid #3CB6A2',
                                    marginTop: '15px'
                                }}
                            />}
                            <Div style={{marginTop: '10px', textAlign: 'center'}}>
                                <Text weight="1" style={{color: 'white'}}>
                                    {userFirstName} {userLastName}
                                </Text>
                            </Div>
                        </Div>
                    </div>


                    <Card style={{
                        borderRadius: '30px',
                        position: 'relative',
                        zIndex: '2',
                        marginTop: '-50px',
                        overflowY: 'auto',
                        height: 'calc(100vh - 50px)'
                    }}>
                        <Header>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Icon28DonateOutline fill="#4CD964" style={{marginRight: '8px'}}/>
                                <Title level='2'>
                                    Мои успехи
                                </Title>
                            </div>
                        </Header>
                        <Separator/>
                        <Group header={<Header>Достижения</Header>}>
                            <HorizontalScroll>
                                <div style={{display: 'flex'}}>
                                    <AchievementsItems/>
                                </div>
                            </HorizontalScroll>
                        </Group>
                        <Group header={<Header>Награды</Header>}>
                            <Div>
                                <CellButton
                                    style={{
                                        color: 'black',
                                        backgroundColor: '#F2FCF4',
                                        marginBottom: '10px',
                                        borderRadius: '10px'
                                    }}
                                    before={
                                        <img src={product1}
                                             alt="Product 1"
                                             style={{
                                                 width: '50px',
                                                 height: '50px',
                                                 objectFit: 'cover',
                                                 borderRadius: '10%'
                                             }}
                                        />
                                    }
                                >
                                    <Div>Брелок "Полосатый кот"</Div>
                                </CellButton>
                                <CellButton
                                    style={{
                                        color: 'black',
                                        backgroundColor: '#F2FCF4',
                                        marginBottom: '10px',
                                        borderRadius: '10px'
                                    }}
                                    before={
                                        <img src={product2}
                                             alt="Product 2"
                                             style={{
                                                 width: '50px',
                                                 height: '50px',
                                                 objectFit: 'cover',
                                                 borderRadius: '10%'
                                             }}
                                        />
                                    }
                                >
                                    <Div>Шариковая ручка</Div>
                                </CellButton>
                            </Div>
                        </Group>
                        <Separator/>
                        <Header>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Icon28CrownOutline fill="#4CD964" style={{marginRight: '8px'}}/>
                                <Title level='2'>
                                    Рейтинг
                                </Title>
                            </div>
                        </Header>
                        {renderUsersData()}
                    </Card>

                    <Div>
                        <Button stretched size="l" onClick={openCamera}>
                            Сканировать Qr код
                        </Button>
                    </Div>


                    <Tabbar style={{position: 'fixed', bottom: 0, width: '100%'}}>
                        <TabbarItem
                            onClick={go}
                            data-to="home"
                            selected={id === 'home'}
                            text="Мероприятия">
                            <Icon28CalendarOutline/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={go}
                            data-to="myevent"
                            selected={id === 'myevent'}
                            text="Мой выбор">
                            <Icon28FavoriteOutline/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={go}
                            data-to="profile"
                            selected={id === 'profile'}
                            text="Профиль">
                            <Icon28UserCircleOutline/>
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
