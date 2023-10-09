import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View, Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderClose, ModalRoot, ModalPage, ModalPageHeader, FixedLayout } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => {
	const [modal, setModal] = useState(null); // Состояние модального окна

	const openModal = () => {
		setModal(
			<ModalRoot activeModal="myModal">
				<ModalPage
					id="myModal"
					onClose={() => setModal(null)}
					header={
						<ModalPageHeader
							left={<PanelHeaderClose onClick={() => setModal(null)} />}
						>
							Модальное окно
						</ModalPageHeader>
					}
				>
					{/* Содержание вашего модального окна */}
					<div>Это ваше модальное окно.</div>
				</ModalPage>
			</ModalRoot>
		);
	};

	return (

		<View id={id} activePanel={id} >
			<Panel id={id}>
				<PanelHeader>Example</PanelHeader>
				{fetchedUser &&
					<Group header={<Header >User Data Fetched with VK Bridge</Header>}>
						<Cell
							before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
							subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
						>
							{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
						</Cell>
					</Group>}

				<Group header={<Header >Navigation Example</Header>}>
					<Div>
						<Button stretched size="l"  onClick={go} data-to="persik">
							Show me the Persik, пожалуйста
						</Button>
						<Button stretched size="l"  onClick={go} data-to="new_page">
							новая страница
						</Button>
						<Button stretched size="l"  onClick={go} data-to="modal">
							modal
						</Button>
					</Div>
				</Group>

				{modal}



					<FixedLayout vertical="bottom">
						<Group mode={"card"}>
							<Div>
					<Button stretched size="l"  onClick={openModal}>
						Открыть модальное окно
					</Button>
							</Div>
						</Group>
					</FixedLayout>

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
