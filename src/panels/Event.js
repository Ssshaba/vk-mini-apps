import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Panel,
    PanelHeader,
    Div,
    Title,
    Button,
    Spacing,
    Text,
    FixedLayout, PanelHeaderBack
} from '@vkontakte/vkui';
import cardPhoto from '../img/cardPhoto.png';
import { Icon20DonateOutline } from '@vkontakte/icons';

const Event = ({ id, go }) => {


    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Отправляем GET-запрос для получения данных
        fetch('https://persikivk.ru/api/event/get/{event.id}')
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error('Ошибка при загрузке данных:', error));
    }, []);


    return (
        <View id={id} activePanel={id}>
            <Panel id={id}>
                <PanelHeader  before={<PanelHeaderBack onClick={go} data-to="home"/>}>Мероприятие</PanelHeader>
                <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingBottom: '60px' }}>
                    <img
                        src={cardPhoto}
                        alt="Фотография мероприятия"
                        style={{ width: '100%', maxWidth: '100%' }}
                    />
                    <div style={{ padding: 20, textAlign: 'left' }}>
                        <Title level="1" weight="bold" style={{ fontSize: '22px' }}>
                            XIII форум программных разработчиков Ростова-на-Дону “Хакатон осень 2023”
                        </Title>
                        <Div style={{ display: 'flex', fontSize: '20px' }}>
                            <Icon20DonateOutline fill="var(--vkui--color_icon_positive)" style={{ marginRight: '8px' }} />
                            <Text weight="2">30 баллов</Text>
                        </Div>
                        <Spacing size={16} />
                        <Text weight="3">МЕДИАПАРК ДГТУ · 2023-10-22 · 16:00</Text>
                        <Spacing size={16} />
                        <Title level="2" weight="bold" style={{ fontSize: '22px' }}>
                            Описание
                        </Title>
                        <Spacing size={16} />
                        <Text weight="2">Хакатон – форум разработчиков, во время которого специалисты из разных областей разработки программного обеспечения (программисты, дизайнеры, маркетологи) работают над поставленной задачей в течение ограниченного времени. Участникам форума в качестве заданий будут представлены 13 технических кейсов от компаний-партнеров. Лучшие разработчики получат денежные призы и возможность прохождения стажировки в ведущих ИТ-компаниях Ростова-на-Дону.</Text>
                    </div>
                </Div>
                <FixedLayout filled vertical="bottom">
                    <Button stretched size="l" onClick={go} data-to="record">
                        Выбрать
                    </Button>
                </FixedLayout>

            </Panel>
        </View>
    );
};






Event.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Event;