import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Panel,
    PanelHeader,
    Div,
    Button,
    FormLayout,
    FormItem,
    Input,
    Select,
    Snackbar,
    FixedLayout,
    SplitLayout, PanelHeaderBack
} from '@vkontakte/vkui';

import { Icon28CheckCircleOutline } from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";


const Record = ({ id, go }) => {
    const [snackbar, setSnackbar] = useState(null); // Состояние уведомления

    const [name, setFullName] = useState('');
    const [group, setGroup] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [faculty, setFaculty] = useState('');

    const [user, setUser] = useState(null); // Состояние информации о пользователе

    // Функция для получения информации о пользователе
    const fetchData = async () => {
        try {
            const user = await bridge.send('VKWebAppGetUserInfo');
            console.log('Информация о пользователе:', user);
            setUser(user);
        } catch (error) {
            console.error('Ошибка при получении информации о пользователе:', error);
        }
    };

    // Вызываем fetchData() при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);


    const handleSend = async (name, group, phone, faculty) => {
        try {
            // Собираем данные для отправки
            const dataToSend = {
                userId: user.id,
                photo100: user.photo_100,
                name,
                group,
                phone,
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

                // Например, закрытие модального окна
                // setModal(null);
            } else {
                // Обработка ошибки
                console.error('Ошибка при отправке данных на сервер');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:'); // , error

            console.error('Статус ошибки:', error.status);
            console.error('Текст ошибки:', error.statusText);
        }

        // После успешной отправки показываем уведомление
        setSnackbar(
            <Snackbar
                onClose={() => setSnackbar(null)}
                before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
            >
                Данные успешно отправлены!
            </Snackbar>
        );
    };

    return (
        <View id={id} activePanel={id}>
            <Panel id={id}>
                <PanelHeader  before={<PanelHeaderBack onClick={go} data-to="event"/>}>Регистрация</PanelHeader>
                    <FormLayout>
                        <FormItem top="ФИО" htmlFor="name">
                            <Input
                                id="name"
                                type="text"
                                placeholder="Иванов Иван Иванович"
                                value={name}
                                onChange={(e) => {
                                    setFullName(e.target.value)
                                    console.log(e.target.value)
                                }}
                            />
                        </FormItem>

                        <FormItem top="Группа" htmlFor="group">
                            <Input
                                id="group"
                                type="text" // Замените 'group' на 'text'
                                placeholder="ВПР11"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                            />
                        </FormItem>

                        <FormItem
                            top="Факультет"
                        >
                            <Select
                                placeholder="Выберите факультет"
                                options={[
                                    { value: '0', label: 'ИиВТ' },
                                    { value: '1', label: 'МКиМТ' },
                                    { value: '2', label: 'ПЛ' },
                                    { value: '3', label: 'АММИУ' },
                                    { value: '4', label: 'АП' }
                                ]}
                                value={faculty}
                                onChange={(e) => setFaculty(e.target.value)} />

                        </FormItem>

                        <FormItem top="Телефон" htmlFor="phone">
                            <Input id="phone"
                                   type="tel"
                                   placeholder="+79001001122"
                                   value={phone}
                                   onChange={(e) => setPhoneNumber(e.target.value)} />
                        </FormItem>

                    </FormLayout>


                <SplitLayout style={{paddingLeft: '15px',  paddingRight: '15px' }}>
                    <FixedLayout filled vertical="bottom" >
                        <Button size="l" stretched onClick={() => handleSend(name, group, phone, faculty)} style={{ background: '#4CD964'}}>
                            Отправить
                        </Button>
                    </FixedLayout>
                </SplitLayout>
                {snackbar}
            </Panel>
        </View>
    );
};



Record.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Record;