import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { View, Panel,
	PanelHeader,
	Group,
	Epic,
	Tabbar,
	TabbarItem,
	CardGrid, ContentCard, } from '@vkontakte/vkui';

import {Icon28ShareOutline, Icon28DonateOutline, Icon28CalendarOutline, Icon28FavoriteOutline} from '@vkontakte/icons';
import Event from "./Event";
import MyEvent from "./MyEvent";
import bridge from "@vkontakte/vk-bridge";


const Home = ({ id, go, fetchedUser, activePanel, setActivePanel }) => {
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

	useEffect(() => {
		// Отправляем GET-запрос для получения данных
		fetch('https://persikivk.ru/api/event')
			.then((response) => response.json())
			.then((data) => setEvents(data))
			.catch((error) => console.error('Ошибка при загрузке данных:', error));
	}, []);

	const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);



	return (

		<View id={id} activePanel={id}>

			<Panel id={id}>

				<PanelHeader
					before={
						<div onClick={go} data-to="score"
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '88px',
								height: '46px',
								borderRadius: '9px',
								background: 'linear-gradient(to right, lightgreen, lightblue',
							}}
						>
							<Icon28DonateOutline />
							<p style={{ fontSize: '28px', paddingBottom: '3px', paddingLeft: '5px' }}>0</p>
						</div>
					}
				>
					Все Мероприятия


				</PanelHeader>
				<Group style = {{marginBottom:'30px', paddingBottom: '30px'}}>
					<CardGrid size="2">
						{events.map((event) => (
							<div style={{ marginBottom: '30px' }} onClick={go} data-to="event">

								<ContentCard style = {{minWidth:'95vw'}}
											 key={event.id}
											 onClick={() => go('event', { id: event.id })}
											 src={event.image }
											 header={event.name}
											 caption={
												 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
													 <div>
														 <p>{`Дата:  ${event.date}`}</p>
													 </div>
													 <div style={{ paddingTop: '5px' }} onClick={e => {
														 e.stopPropagation(); // Предотвращение срабатывания onClick родительской карточки
														 handleGetFriendsClick(); // Вызов вашей функции
													 }}>
														 <Icon28ShareOutline />
													 </div>
												 </div>
											 }
											 maxHeight={150}
								/>
							</div>
						))}
					</CardGrid>
				</Group>
				<Epic
					activeStory={activeStory}
					tabbar={
						<Tabbar>
							<TabbarItem
								onClick={(onStoryChange, go)}

								data-to="home"
								selected={activeStory === 'main'}
								data-story="main"
								text={<p style={{fontSize: '18px', paddingBottom: '3px'}}>Мероприятия</p>}
							>
								<Icon28CalendarOutline />
							</TabbarItem>
							<TabbarItem
								onClick={(onStoryChange, go)}

								data-to="myevent"
								selected={activeStory === 'services'}
								data-story="services"
								text={<p style={{fontSize: '18px', paddingBottom: '3px'}}>Мои мероприятия</p>}
							>
								<Icon28FavoriteOutline />
							</TabbarItem>
						</Tabbar>
					}
				>
					<View id='main' activePanel={activePanel}>
						<Home id='home' fetchedUser={fetchedUser} go={go} />
						<Event id='event' go={go} />
						<MyEvent id='myevent' go={go} />
					</View>
				</Epic>
			</Panel>
		</View>




	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
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
