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
    FixedLayout
} from '@vkontakte/vkui';
import {Icon20DonateOutline} from "@vkontakte/icons";

const Event = ({id, go, activePanel, setActivePanel, selectedEventId}) => {
    const [eventInfo, setEventInfo] = useState(null);

    useEffect(() => {
        // Отправляем GET-запрос для получения данных о конкретном мероприятии
        if (selectedEventId) {
            fetch(`https://persikivk.ru/api/event/get/${selectedEventId}`)
                .then((response) => response.json())
                .then((data) => setEventInfo(data))
                .catch((error) => console.error('Ошибка при загрузке данных:', error));
        }
    }, [selectedEventId]);

    return (
        <View id={id} activePanel={activePanel}>
            <Panel id={id}>
                <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home"/>}>Информация о
                    мероприятии</PanelHeader>
                <Group>
                    {eventInfo ? (
                        <Div>
                            <img
                                src={eventInfo.image}
                                alt="Фотография мероприятия"
                                style={{width: '100%', maxWidth: '100%'}}
                            />

                            <Div style={{padding: 20, textAlign: 'left'}}>
                                <Title level="1" weight="bold" style={{fontSize: '22px'}}>
                                    {eventInfo.name}
                                </Title>
                                <div style={{display: 'flex', fontSize: '20px'}}>
                                    <Icon20DonateOutline fill="var(--vkui--color_icon_positive)"
                                                         style={{marginRight: '8px'}}/>
                                    <Text weight="2">{eventInfo.points} баллов</Text>
                                </div>
                                <Text weight="3">{eventInfo.location} · {eventInfo.date}</Text>
                                <Title level="2" weight="bold" style={{fontSize: '22px', paddingTop: '16px', paddingBottom: '16px'}}>
                                    Описание
                                </Title>
                                <Text weight="regular" style={{paddingBottom: '20px'}}>{eventInfo.description}</Text>
                            </Div>
                        </Div>
                    ) : (
                        <Div>
                            <p>Загрузка информации о мероприятии...</p>
                        </Div>
                    )}

                </Group>
                <FixedLayout filled vertical="bottom">
                    <Div>
                        <Button stretched size="l" onClick={go} data-to="record">
                            Выбрать
                        </Button>
                    </Div>
                </FixedLayout>
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
