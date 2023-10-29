import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Panel,
  PanelHeader,
  Button,
  Div,
  Text,
  Title,
  Group,
  SimpleCell,
  Snackbar,
  CellButton,
  Avatar,
  PanelHeaderBack
} from '@vkontakte/vkui';
import wrapperForScore from '../img/wrapperForScore.png';
import product1 from '../img/product1.png';
import product2 from '../img/product2.png';
import product3 from '../img/product3.png';
import {
  Icon28CheckCircleOutline,
  Icon28AddSquareOutline,
  Icon20DonateOutline,
  Icon28ShareOutline,
  Icon12Repost
} from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";

const Score = ({ id, go }) => {
  const [snackbar, setSnackbar] = useState(null);
  const [buttonIcons, setButtonIcons] = useState({}); // Состояния кнопок
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);

  const handleGetFriendsClick = async () => {
    try {
      // const tokenData = await bridge.send('VKWebAppGetAuthToken', {
      //   app_id: 51766180,
      //   scope: 'friends,status',
      // });

      const friendsData = await bridge.send('VKWebAppShare', {
        link: 'https://vk.com/app51766180',
      });
      console.log(tokenData);
      setFriends(friendsData.items);
      setIsSnackbarShown(true);
    } catch (error) {
      console.error(error);
    }
  };



  const renderProductCell = (title, price, imageSrc, productId) => (
    <SimpleCell
      before={<img src={imageSrc} alt={title} style={{ marginRight: '8px', width: '40px', height: '40px', objectFit: 'cover', paddingLeft: '20px', paddingRight: '20px' }} />}
      after={
        <Button mode="commerce" style={{ background: 'none', padding: 0, border: 'none' }} onClick={() => handleButtonClick(productId)}>
          {buttonIcons[productId] || <Icon28AddSquareOutline style={{ width: '38px', height: '38px' }} />}
        </Button>
      }
    >
      <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '8px' }}>
        <Text style={{ fontSize: '20px', marginBottom: '4px' }}>{title}</Text>
        <Text style={{ fontSize: '18px', color: 'gray' }}>{price}</Text>
      </Div>
    </SimpleCell>
  );

  const handleButtonClick = (productId) => {
    if (isSnackbarShown) {
      return;
    }

    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
      >
        Награда ваша!
      </Snackbar>
    );
    
    setButtonIcons((prevIcons) => ({
      ...prevIcons,
      [productId]: <Icon28CheckCircleOutline fill="#B8C1CC" style={{ width: '38px', height: '38px' }} />,
    }));

    setIsSnackbarShown(true);
  };

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home"/>}
        >Мои баллы</PanelHeader>

        <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
            <img
              src={wrapperForScore}
              alt="Рамка для баллов"
              style={{ width: '90%', maxWidth: '90%' }}
            />
            <Div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
              <Div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <Text weight="1" style={{ color: 'gray', fontSize: '18px' }}>БАЛАНС</Text>
              </Div>
              <Div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <Text weight="2" style={{ fontSize: '38px', paddingTop: '7px' }}>0</Text>
                <Icon20DonateOutline fill="var(--vkui--color_icon_positive)" style={{ width: '38px', height: '38px', marginLeft: '8px' }} />
              </Div>
              <CellButton 
              centered 
              before={<Icon28ShareOutline fill="#007fff" style={{ marginRight: '8px' }}/>} 
              onClick={handleGetFriendsClick} 
              style={{ width: '200px', margin: '0 auto', borderRadius: '9px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ color: '#007fff', fontSize: '20px' }}>Поделиться</Text>
              </div>
            </CellButton>
            </Div>
          </Div>
          {snackbar}
        </Div>
        <Title level="1" weight="bold" style={{ fontSize: '24px', textAlign: 'left', paddingLeft: '30px', marginBottom: '10px'}}>Награды</Title>
        <Group>
          {renderProductCell('Термокружка', '70 баллов.', product1, 'product1')}
          {renderProductCell('Powerbank', '100 баллов.', product2, 'product2')}
          {renderProductCell('Графический планшет', '120 баллов.', product3, 'product3')}
        </Group>
      </Panel>
    </View>
  );
};

Score.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Score;
