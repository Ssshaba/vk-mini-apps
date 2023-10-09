import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { closePage } from '../utils/utilities';
import {
    View,
    SplitLayout,
    Panel,
    PanelHeader,
    PanelHeaderClose,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    Button,
    FixedLayout,
    Div,
    Cell,
    AppRoot,
    Group,
    DivProps,
    PopoutWrapper
} from '@vkontakte/vkui';

const NewPage = (props) => {

    const [modalActive, setModalActive] = useState(false);

    const openModal = () => {
        setModalActive(true);
    };

    const closeModal = () => {
        setModalActive(false);
    };


    return (
        <PopoutWrapper>
            <View activePanel="div">

            <Panel id="div">

                <PanelHeader
                    before={<PanelHeaderClose onClick={closePage} />}
                >
                    Главная
                </PanelHeader>

                {/* Добавляем пустой блок для создания пространства */}


                    <Group>
                        <Div>
                            <FixedLayout vertical="bottom">
                                <Group>

                                    <Div >
                            <Button onClick={openModal} stretched mode="secondary" size="m">
                                Edit Info
                            </Button>
                                    </Div>

                                </Group>
                            </FixedLayout>

                        </Div>
                    </Group>
                {modalActive &&
                    <ModalRoot activeModal={modalActive ? 'modal' : null} onClose={closeModal}>

                        <ModalPage
                            id="modal"
                            header={
                                <ModalPageHeader>
                                    Модальное окно
                                </ModalPageHeader>
                            }
                            onClose={closeModal}
                        >
                            <p>Контент модалки</p>
                            <Button onClick={closeModal}>Закрыть</Button>
                        </ModalPage>

                    </ModalRoot>

                }

            </Panel>
            </View>
        </PopoutWrapper>
    );
}

NewPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default NewPage;
