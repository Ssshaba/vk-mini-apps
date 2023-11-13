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
    FormLayout, Snackbar, ButtonGroup
} from '@vkontakte/vkui';
import {Icon16DonateOultine, Icon28CancelCircleFillRed, Icon28CheckCircleOutline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

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
                // setModal(null);
            } else {
                // Обработка ошибки
                console.error('Ошибка при отправке данных на сервер');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);

            console.error('Статус ошибки:', error.status);
            console.error('Текст ошибки:', error.statusText);
        }

        // Помечаем, что пользователь отправил данные
        localStorage.setItem('hasSentData', 'true');
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
        // Проверяем, отправлял ли пользователь данные
        const hasSentData = localStorage.getItem('hasSentData');
        if (hasSentData) {
            console.log(localStorage);
            // Если пользователь уже отправлял данные, не открываем модальное окно
            setModalActive(null); // Установите modalActive в null, чтобы закрыть модальное окно
            return;
        }
        setModalActive('welcomeModal');
    }, []);




    const handleRegister = async () => {
        try {



            // Замените userId и eventId на актуальные значения
            const userId = parseInt(user.id, 10);  // или любой другой способ получения идентификатора пользователя
            const eventId = parseInt(selectedEventId, 10);  // или любой другой способ получения идентификатора мероприятия


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
                            // Закрываем окно только после успешной отправки
                            go({currentTarget: {dataset: {to: 'myevent'}}});
                        }}
                        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)"/>}
                    >
                        Данные успешно отправлены!
                    </Snackbar>
                );
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

                            <Div style={{padding: 20, textAlign: 'left', marginBottom: '45px'}}>
                                <Title level="1" weight="bold" style={{fontSize: '22px'}}>
                                    {eventInfo.name}
                                </Title>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Icon16DonateOultine fill="var(--vkui--color_icon_positive)" style={{ marginRight: '8px' }} />
                                    <Text weight="2" style={{ marginBottom: 0 }}>{eventInfo.points} баллов</Text>
                                </div>

                                <Text weight="3">{eventInfo.location} · {eventInfo.date}</Text>
                                <Title level="2" weight="bold"
                                       style={{fontSize: '22px', paddingTop: '16px', paddingBottom: '16px'}}>
                                    Описание
                                </Title>
                                <Text weight="regular" style={{paddingBottom: '20px'}}>{eventInfo.description}</Text>

                            </Div>
                        </div>
                    ) : (
                        <Div>
                            <p>Загрузка информации о мероприятии...</p>
                        </Div>
                    )}

                </Group>
                <SplitLayout modal={modal}>
                    <FixedLayout filled vertical="bottom">
                        <Group mode={"card"}>
                            <Div>
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
