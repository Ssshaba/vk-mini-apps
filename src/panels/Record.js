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

import { Icon28CheckCircleOutline, Icon28CancelCircleFillRed } from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";


const Record = ({ id, go }) => {
    const [snackbar, setSnackbar] = useState(null);
    const [name, setFullName] = useState('');
    const [group, setGroup] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [faculty, setFaculty] = useState(null);
    const [formValid, setFormValid] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
  
    const [user, setUser] = useState(null);
  
    const [nameError, setNameError] = useState('');
    const [groupError, setGroupError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [facultyError, setFacultyError] = useState('');
  
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
        if (snackbar && id === 'record') {
            if (submitStatus === 'success') {
                const timeoutId = setTimeout(() => {
                    go({ currentTarget: { dataset: { to: 'myevent' } } });
                }, 2000);
            return () => clearTimeout(timeoutId);
            setSubmitStatus(null);
            }
        }
      }, [snackbar, id, go, submitStatus]);
  
    useEffect(() => {
        const isNameValid = name ? name.trim() !== '' : false;
        const isGroupValid = group ? group.trim() !== '' : false;
        const isPhoneValid = phone ? phone.trim() !== '' : false;
        const isFacultyValid = faculty ? faculty.trim() !== '' : false;
      
        setFormValid(isNameValid && isGroupValid && isPhoneValid && isFacultyValid);
      
        // Обновляем сообщения об ошибках
        if (buttonClicked) {
          setNameError(isNameValid ? '' : 'Заполните это поле');
          setGroupError(isGroupValid ? '' : 'Заполните это поле');
          setPhoneError(isPhoneValid ? '' : 'Заполните это поле');
          setFacultyError(isFacultyValid ? '' : 'Заполните это поле');
        }
      }, [name, group, phone, faculty, buttonClicked]);
  
    const handleSend = async (name, group, phone, faculty) => {
      // Проверяем, что все поля заполнены перед отправкой
      if (!formValid) {
        console.error('Заполните все обязательные поля');
        setButtonClicked(true);
        setSnackbar(
            <Snackbar
                onClose={() => {
                    setSnackbar(null);
                }}
                before={<Icon28CancelCircleFillRed />}
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
            setSnackbar(
                <Snackbar
                  onClose={() => {
                    setSnackbar(null);
                    // Закрываем окно только после успешной отправки
                    go({ currentTarget: { dataset: { to: 'myevent' } } });
                  }}
                  before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
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
    };

    return (
        <View id={id} activePanel={id}>
            <Panel id={id}>
                <PanelHeader  before={<PanelHeaderBack onClick={go} data-to="event"/>}>Регистрация</PanelHeader>
                    <FormLayout style={{marginBottom: '30px'}}>
                    <FormItem top="ФИО" htmlFor="name" bottom={<span style={{ color: 'red' }}>{nameError}</span>}>
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

                        <FormItem top="Группа" htmlFor="group" bottom={<span style={{ color: 'red' }}>{groupError}</span>}>
                            <Input
                                id="group"
                                type="text"
                                placeholder="ВПР11"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                            />
                        </FormItem>

                        <FormItem top="Факультет" bottom={<span style={{ color: 'red' }}>{facultyError}</span>}>
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

                        <FormItem top="Телефон" htmlFor="phone" bottom={<span style={{ color: 'red' }}>{phoneError}</span>}>
                            <Input id="phone"
                                   type="tel"
                                   placeholder="+79001001122"
                                   value={phone}
                                   onChange={(e) => setPhoneNumber(e.target.value)} />
                        </FormItem>
                    </FormLayout>
                <SplitLayout>
                    <FixedLayout filled vertical="bottom" >
                        <Div>
                            <Button centered size="l" stretched onClick={() => handleSend(name, group, phone, faculty)} style={{ background: '#4CD964'}}>
                                Отправить
                            </Button>
                        </Div>
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