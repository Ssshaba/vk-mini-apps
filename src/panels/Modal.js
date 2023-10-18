import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SplitCol, CellButton, SplitLayout, View, Panel, PanelHeader, Group, Button, PopoutWrapper, ModalDismissButton, PanelHeaderBack} from '@vkontakte/vkui';
import { useAdaptivityConditionalRender } from '@vkontakte/vkui';

const Modal = (props) => {
    // не использовать это модальное окно, как пример брать из Home
    const CustomPopout = ({ onClose }) => {
        const { sizeX } = useAdaptivityConditionalRender();
        return (
            <PopoutWrapper onClick={onClose}>
                <div
                    style={{
                        backgroundColor: 'var(--vkui--color_background_content)',
                        borderRadius: 8,
                        position: 'relative',
                        padding: '12px',
                    }}
                >
                    <h4>Кастомное модальное окно</h4>

                    {sizeX.regular && (
                        <ModalDismissButton className={sizeX.regular.className} onClick={onClose} />
                    )}
                </div>
            </PopoutWrapper>
        );
    };

    const Example = () => {
        const [popout, setPopout] = React.useState(null);

        const onClick = () => setPopout(<CustomPopout onClose={() => setPopout(null)} />);

        return (
            <SplitLayout popout={popout}>
                <SplitCol>
                    <View activePanel="popout">
                        <Panel id="popout" style={{background:'black'}}>
                            <PanelHeader 	before={<PanelHeaderBack onClick={props.go} data-to="home"/>}>ModalDismissButton</PanelHeader>
                            <Group >
                                <Button size="l" onClick={onClick}>Открыть модальное окно</Button>
                            </Group>
                        </Panel>
                    </View>
                </SplitCol>
            </SplitLayout>
        );
    };

    return <Example />;
}

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Modal;
