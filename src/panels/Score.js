import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Panel,
  PanelHeader,
  IconButton,
  Div,
  Text,
  Group,
  CellButton,
  Snackbar,
  Image,
  Avatar,
  PanelHeaderBack,
  Header,
  HorizontalCell,
  HorizontalScroll,
  Separator
} from '@vkontakte/vkui';
import wrapperForScore from '../img/wrapperForScore.png';
import product1 from '../img/product1.png';
import product2 from '../img/product2.png';
import product3 from '../img/product3.png';
import product4 from '../img/product4.png';
import product5 from '../img/product5.png';
import achievement1 from '../img/newachievement1.png';
import achievement2 from '../img/newachievement2.png';
import achievement3 from '../img/newachievement3.png';
import achievement4 from '../img/newachievement4.png';
import achievement5 from '../img/newachievement5.png';
import achievement6 from '../img/newachievement6.png';

import {
  Icon28CheckCircleOutline,
  Icon28AddSquareOutline,
  Icon28DonateOutline,
  Icon28ShareOutline,
  Icon12Repost
} from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";

const Score = ({ id, go }) => {
  const [snackbar, setSnackbar] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await bridge.send('VKWebAppGetUserInfo');
        setUserPhoto(userData.photo_100);
      } catch (error) {
        console.error('Ошибка при получении информации о пользователе:', error);
      }
    };

    fetchUserInfo();
  }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только при монтировании


  const handleGetStoryClick = async () => {
    try {
      const storyData = await bridge.send('VKWebAppShowStoryBox', {
        background_type: 'image',
        url: 'https://raw.githubusercontent.com/Jabovich/homework/de5b43ddaf11cf094de2386a8e51f333117d482b/storyBackgroundWithScores.png',
        attachment: {
          text: 'book',
          type: 'photo',
          owner_id: 743784474,
          id: 12345678
        }
      });

      if (storyData.code_data) {
        // Редактор историй открыт
        console.log(storyData);
      } else {
        console.log('История не была опубликована');
      }
    } catch (error) {
      // Ошибка
      console.error(error);
    }
  };

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

  const achievementsItems = [
    {
      id: 1,
      title: 'Почуствовал вкус',
      icon_139: achievement1,
    },
    {
      id: 2,
      title: 'Отличник',
      icon_139: achievement2,
    },
    {
      id: 3,
      title: 'Мамина гордость',
      icon_139: achievement3,
    },
    {
      id: 4,
      title: 'Oh yeah, baby!',
      icon_139: achievement4,
    },
    {
      id: 5,
      title: 'МегаКрутой',
      icon_139: achievement5,
    },
    {
      id: 6,
      title: 'Сенсей',
      icon_139: achievement6,
    },
  ];
  
  const AchievementsItems = () => {
    return achievementsItems.map(({ id, title, icon_139 }) => (
      <HorizontalCell key={id} size="m" header={title} style={{ whiteSpace: 'normal' }}>
        <Image size={88} borderRadius="l" src={icon_139} />
      </HorizontalCell>
    ));
  };  
  
  const handleButtonClick = (productId) => {

    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
      >
        Награда ваша!
      </Snackbar>
    );
  };

  const handleCellButtonClick = (productId) => {
    handleButtonClick(productId);
  };

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader 
          before={<PanelHeaderBack onClick={go} data-to="home"/>}
          style={{textAlign: 'center'}}
        >Мои баллы</PanelHeader>

        <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Div style={{ position: 'relative', width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={wrapperForScore}
              alt="Рамка для баллов"
              style={{ width: '90%', maxWidth: '90%' }}
            />
            <Div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {userPhoto && <Avatar 
                src={userPhoto} 
                size={100}  
                style={{ 
                  border: '3px solid #3CB6A2',
                  marginTop: '15px'
                }} 
              />}
              <Div style={{marginLeft: '10px', display: 'flex', alignItems: 'center'}}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'auto',
                    height: '30px',
                    background: 'linear-gradient(to right, #4DDA65, #298FE1)',
                    borderRadius: '9px',
                    padding: '0px 20px',
                    marginRight: '10px',
                  }}>
                  <Icon28DonateOutline style={{ color: 'white', width: '20px', height: '20px' }} />
                  <Text weight="2" style={{ color: 'white', fontSize: '17px', paddingLeft: '5px' }}>0</Text>
                </div>
                <IconButton onClick={handleGetStoryClick}>
                  <Icon28ShareOutline fill="#007fff"/>
                </IconButton>
              </Div>
            </Div>
          </Div>
          {snackbar}
        </Div>
        <Separator />
        <Group header={<Header>Достижения</Header>}>
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>
              <AchievementsItems />
            </div>
          </HorizontalScroll>
        </Group>
        <Group header={<Header>Награды</Header>}>
        <Div>
          <CellButton
            style={{ color: 'black', backgroundColor: '#F2FCF4', marginBottom: '10px', borderRadius: '10px' }}
            onClick={() => handleCellButtonClick(id)}
            before={
              <img src={product1}
                lt="Product 1"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10%' }}
              />
            }
            after={
              <Div style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>20</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div>Брелок "Полосатый кот"</Div>
          </CellButton>
          <CellButton
            style={{ color: 'black', backgroundColor: '#F2FCF4', marginBottom: '10px', borderRadius: '10px' }}
            onClick={() => handleCellButtonClick(id)}
            before={
              <img src={product2}
                lt="Product 2"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10%' }}
              />
            }
            after={
              <Div style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>40</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div>Шариковая ручка</Div>
          </CellButton>
          <CellButton
            style={{ color: 'black', backgroundColor: '#F2FCF4', marginBottom: '10px', borderRadius: '10px' }}
            onClick={() => handleCellButtonClick(id)}
            before={
              <img src={product3}
                lt="Product 3"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10%' }}
              />
            }
            after={
              <Div style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>70</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div>Термокружка</Div>
          </CellButton>
          <CellButton
            style={{ color: 'black', backgroundColor: '#F2FCF4', marginBottom: '10px', borderRadius: '10px' }}
            onClick={() => handleCellButtonClick(id)}
            before={
              <img src={product4}
                lt="Product 4"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10%' }}
              />
            }
            after={
              <Div style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>100</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div>Powerbank</Div>
          </CellButton>
          <CellButton
            style={{ color: 'black', backgroundColor: '#F2FCF4', marginBottom: '10px', borderRadius: '10px' }}
            onClick={() => handleCellButtonClick(id)}
            before={
              <img src={product5}
                lt="Product 5"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10%' }}
              />
            }
            after={
              <Div style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>140</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div>Графический планшет</Div>
          </CellButton>
          </Div>
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
