import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Panel,
    PanelHeader,
    Group,
    Div,
    Button,
    Title,
    Text,
    PanelHeaderBack,
    FixedLayout,
    SplitLayout,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderClose,
    FormItem,
    Input,
    Select,
    Separator,
    Spacing,
    FormLayout, Snackbar, ButtonGroup, ModalCard
} from '@vkontakte/vkui';
import {Icon16DonateOultine, Icon28CancelCircleFillRed, Icon28CheckCircleOutline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import persicFail from '../img/persikQR2.png';

const Event = ({id, go, activePanel, setActivePanel, selectedEventId}) => {
    const [eventInfo, setEventInfo] = useState(null);
    const [modalActive, setModalActive] = React.useState('welcomeModal');

    const [user, setUser] = useState(null);
    const [group, setGroup] = useState('');
    const [faculty, setFaculty] = useState(null);
    const [groupError, setGroupError] = useState('');
    const [facultyError, setFacultyError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [snackbar, setSnackbar] = useState(null);
    const [hasSentData, setHasSentData] = useState(false);


    const [RegisterModal, setRegisterModal] = useState(null); // Состояние модального окна


    useEffect(() => {

        const isGroupValid = group ? group.trim() !== '' : false;

        const isFacultyValid = faculty ? faculty.trim() !== '' : false;

        setFormValid(isGroupValid && isFacultyValid);

        // Обновляем сообщения об ошибках
        if (buttonClicked) {

            setGroupError(isGroupValid ? '' : 'Заполните это поле');

            setFacultyError(isFacultyValid ? '' : 'Заполните это поле');
        }
    }, [group, faculty, buttonClicked]);


    const fetchData = async () => {
        try {
            const user = await bridge.send('VKWebAppGetUserInfo');
            console.log('Информация о пользователе:', user);
            setUser(user);
        } catch (error) {
            console.error('Ошибка при получении информации о пользователе:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Проверяем, отправлял ли пользователь данные
        bridge.send('VKWebAppStorageGet', {
            keys: ['hasSentData']
        })
            .then((storageData) => {
                if (storageData.keys) {
                    const storedData = storageData.keys.find(item => item.key === 'hasSentData');
                    if (storedData && storedData.value === 'true') {
                        setModalActive(null); // Установите modalActive в null, чтобы закрыть модальное окно
                        setHasSentData(true);
                    }
                }
            })
            .catch(error => {
                console.error('Ошибка при проверке данных в хранилище:', error);
            });
    }, []);

    const handleSend = async (group, faculty) => {
        // Проверяем, что все поля заполнены перед отправкой
        if (!formValid) {
            console.error('Заполните все обязательные поля');
            setButtonClicked(true);
            setSnackbar(
                <Snackbar
                    onClose={() => {
                        setSnackbar(null);
                    }}
                    before={<Icon28CancelCircleFillRed/>}
                >
                    Пожалуйста, заполните все поля!
                </Snackbar>
            );
            return;
        }

        try {
            // Собираем данные для отправки
            const dataToSend = {
                vkId: user.id,
                photo100: user.photo_100,
                name: user.first_name + ' ' + user.last_name,
                group,
                //phone,
                faculty,
            };

            // Выводим данные в консоль перед отправкой
            console.log('Данные для отправки на сервер:', dataToSend);

            // Отправляем данные на сервер
            const response = await fetch('https://persikivk.ru/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                // Обработка успешного ответа от сервера
                // Выводим информацию о данных и их формате в консоли
                console.log('Данные успешно отправлены на сервер. Ответ сервера:', await response.json());
                setSnackbar(
                    <Snackbar
                        onClose={() => {
                            setSnackbar(null);
                            // Закрываем окно только после успешной отправки
                            //go({currentTarget: {dataset: {to: 'myevent'}}});
                        }}
                        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)"/>}
                    >
                        Данные успешно отправлены!
                    </Snackbar>
                );

                // Например, закрытие модального окна
                setModalActive(null);

                // Помечаем, что пользователь отправил данные
                bridge.send('VKWebAppStorageSet', { key: 'hasSentData', value: 'true' });
            } else {
                // Обработка ошибки
                console.error('Ошибка при отправке данных на сервер');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);

            console.error('Статус ошибки:', error.status);
            console.error('Текст ошибки:', error.statusText);
        }
    };


    useEffect(() => {
        // Отправляем GET-запрос для получения данных о конкретном мероприятии
        if (selectedEventId) {
            fetch(`https://persikivk.ru/api/event/get/${selectedEventId}`)
                .then((response) => response.json())
                .then((data) => setEventInfo(data))
                .catch((error) => console.error('Ошибка при загрузке данных:', error));

        }
    }, [selectedEventId]);

    const openModalsDuplicateRegister = () => {
        // Модальное окно с предупреждением о повторном сканировании
        setRegisterModal(
            <ModalRoot
                onClose={() => setRegisterModal(null)}
                activeModal="duplicateScanModal"
            >
                <ModalCard
                    id="duplicateScanModal"
                    onClose={() => setRegisterModal(null)}
                    header={
                        <ModalPageHeader
                            left={<PanelHeaderClose onClick={() => setRegisterModal(null)}/>}
                            style={{color: '#2688EB'}}
                        >
                            Ай-ай-ай!
                        </ModalPageHeader>
                    }
                >
                    <Div style={{textAlign: 'center'}}>
                        <img
                            style={{width: '80%', marginTop: '10px'}}
                            src={persicFail}
                            alt="картинка"
                        />
                        <Title
                            level="3"
                            weight="semibold"
                            style={{marginTop: '20px', color: '#2688EB'}}
                        >
                            Вы уже записались на это мероприятие!
                        </Title>
                    </Div>
                </ModalCard>
            </ModalRoot>
        );
    };


    const modal = (
        <ModalRoot activeModal={modalActive}>
            <ModalPage
                id="welcomeModal"
                onClose={() => setModalActive(null)}
                header={
                    <ModalPageHeader
                        left={<PanelHeaderClose onClick={() => setModalActive(null)}/>}
                    >Добро пожаловать!</ModalPageHeader>}
            >

                <FormLayout style={{marginBottom: '30px'}}>


                    <FormItem top="Факультет" bottom={<span style={{color: 'red'}}>{facultyError}</span>}>
                        <Select
                            placeholder="Выберите факультет"
                            options={[
                                {value: '0', label: 'ИиВТ'},
                                {value: '1', label: 'МКиМТ'},
                                {value: '2', label: 'ПЛ'},
                                {value: '3', label: 'АММИУ'},
                                {value: '4', label: 'АП'}
                            ]}
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}/>

                    </FormItem>

                    <FormItem top="Группа" htmlFor="group" bottom={<span style={{color: 'red'}}>{groupError}</span>}>
                        <Input
                            id="group"
                            type="text"
                            placeholder="ВПР11"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        />
                    </FormItem>

                </FormLayout>

                <Div>
                    <ButtonGroup mode="horizontal" gap="m" stretched>

                        <Button size="l" appearance="negative" stretched onClick={() => setModalActive(null)}>
                            Не сейчас
                        </Button>

                        <Button size="l" stretched onClick={() => handleSend(group, faculty)} style={{background: '#4CD964'}}>
                            Отправить
                        </Button>
                    </ButtonGroup>
                </Div>
                {snackbar}
            </ModalPage>
        </ModalRoot>
    );
    useEffect(() => {
        // Если пользователь уже отправил данные, не открываем модальное окно
        if (hasSentData) {
            setModalActive(null);
        }
    }, [hasSentData]);




    const handleRegister = async () => {
        try {
            // Замените userId и eventId на актуальные значения
            const userId = parseInt(user.id, 10);
            const eventId = parseInt(selectedEventId, 10);

            if (!userId || !eventId) {
                console.error('Неверные идентификаторы пользователя или мероприятия');
                return;
            }

            const res = await fetch(`https://persikivk.ru/api/user/register-for-event/${userId}/${eventId}`, {
                method: 'POST',
            });

            if (res.ok) {
                console.log('Пользователь успешно записан на мероприятие');
                setSnackbar(
                    <Snackbar
                        onClose={() => {
                            setSnackbar(null);
                            go({currentTarget: {dataset: {to: 'myevent'}}});
                        }}
                        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)"/>}
                    >
                        Данные успешно отправлены!
                    </Snackbar>
                );
            } else if (res.status === 400) {
                console.error('Ты уже зарегистрирован на это мероприятие');
                // Здесь вы можете добавить дополнительные действия для обработки ошибки 400
                openModalsDuplicateRegister();
            } else {
                console.error('Ошибка при записи пользователя на мероприятие');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };



    return (
        <View id={id} activePanel={activePanel}>
            <Panel id={id}>
                <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home"/>}>Информация о
                    мероприятии</PanelHeader>
                <Group>
                    {eventInfo ? (
                        <div style={{marginBottom: '20px'}}>
                            <img
                                src={eventInfo.image}
                                alt="Фотография мероприятия"
                                style={{width: '100%', maxWidth: '100%'}}
                            />

                            <Div style={{ textAlign: 'left'}}>
                                <Title level="1" weight="bold" style={{fontSize: '22px'}}>
                                    {eventInfo.name}
                                </Title>
                                <Spacing size={11} />
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Icon16DonateOultine fill="var(--vkui--color_icon_positive)" style={{ marginRight: '8px' }} />
                                    <Text weight="1" style={{ marginBottom: 0 }}>{eventInfo.pointValue}<span style={{fontSize: '16px', fontWeight: 'lighter'}}> баллов</span></Text>
                                </div>
                                <Spacing size={11} />
                                <Text weight="3" style={{color: '#818C99'}}>{eventInfo.date} · {eventInfo.startTime} · {eventInfo.location}</Text>
                            </Div>
                            <Spacing size={5} >
                                <Separator />
                            </Spacing>
                            <Div style={{padding: 20, textAlign: 'left'}}>
                                <Title level="2" weight="bold" style={{fontSize: '22px', paddingBottom: '16px'}}>
                                    Описание
                                </Title>
                                <Text weight="regular" >{eventInfo.description}</Text>
                                <Spacing size={60} />
                            </Div>
                        </div>
                    ) : (
                        <Div>
                            <p>Загрузка информации о мероприятии...</p>
                        </Div>
                    )}

                </Group>
                <SplitLayout modal={RegisterModal}></SplitLayout>
                <SplitLayout modal={modal}>
                    <FixedLayout filled vertical="bottom">
                        <Group mode={"card"}>
                            <Div style={{color: '#2787F5'}}>
                                <Button stretched size="l" onClick={handleRegister} >
                                    Записаться
                                </Button>
                            </Div>
                        </Group>
                    </FixedLayout>
                </SplitLayout>
                {snackbar}
            </Panel>
        </View>
    );
};

Event.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    activePanel: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    selectedEventId: PropTypes.string,
};

export default Event;
