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
import gift from '../img/gift.png';
import product1 from '../img/product11.png';
import product2 from '../img/product21.png';
import product3 from '../img/product31.png';
import product4 from '../img/product41.png';
import product5 from '../img/product51.png';
import achievement1 from '../img/newachievement1.png';
import achievement2 from '../img/lockedachievement2.png';
import achievement3 from '../img/lockedachievement3.png';
import achievement4 from '../img/lockedachievement4.png';
import achievement5 from '../img/lockedachievement5.png';
import achievement6 from '../img/lockedachievement6.png';

import {
  Icon28CheckCircleOutline,
  Icon16DonateOultine,
  Icon28DonateOutline,
  Icon28ShareOutline,
} from '@vkontakte/icons';
import { Icon28StoryOutline } from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";

const Score = ({ id, go }) => {
  const [snackbar, setSnackbar] = useState(null);
  const [user, setUser] = useState({});
  const [ServerUser, setServerUser] = useState({});
  useEffect(() => {

    const fetchUsersData = async () => {
      try {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);

        const userId = user.id;
        //console.log(user.id);
        const response = await fetch(`https://persikivk.ru/api/user/${userId}`);
        const data = await response.json();
        setServerUser(data);
        //console.log('Исходные данные пользователей:', data);
        //console.log('Исходные данные пользователей:', data.points);

      } catch (error) {
        console.error('Очки:', error);
      }
    };
    fetchUsersData();
  }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только при монтировании


  const handleGetStoryClick = async () => {
    try {
      const storyData = await bridge.send('VKWebAppShowStoryBox',{
        "background_type": "image",
        "url": "https://raw.githubusercontent.com/Ssshaba/Foto-for-Story-VK/main/STORY2.png",
        "stickers": [
          {
            "sticker_type": "renderable",
            "sticker": {
              "can_delete": 0,
              "content_type": "image",
              "url": "https://raw.githubusercontent.com/Ssshaba/Foto-for-Story-VK/main/achievement1.png",
              "clickable_zones": [
                {
                  "action_type": "link",
                  "action": {
                    "link": "https://vk.com/wall-166562603_1192",
                    "tooltip_text_key": "tooltip_open_post"
                  },
                  "clickable_area": [
                    {
                      "x": 17,
                      "y": 110
                    },
                    {
                      "x": 97,
                      "y": 110
                    },
                    {
                      "x": 97,
                      "y": 132
                    },
                    {
                      "x": 17,
                      "y": 132
                    }
                  ]
                }
              ]
            }
          }
        ]
      });

      if (storyData.code_data) {
        // Редактор историй открыт
        //console.log(storyData);
      } else {
        //console.log('История не была опубликована');
      }
    } catch (error) {
      // Ошибка
      console.error(error);
    }
  };

  const showStory = async () => {

    const renderableStickerImage = {
      content_type: "image", // Тип объекта-стикера (в данном случае, изображение)
      url: "https://raw.githubusercontent.com/Ssshaba/Foto-for-Story-VK/main/achievement1.png", // Ссылка на картинку
      // ИЛИ
      // blob: "data:image/png;base64,<base64-image-data>", // Данные изображения, закодированные как Base64

      transform: {
        // Параметры, описывающие поворот или смещение стикера в создаваемой истории
        rotation: 0, // Поворот против часовой стрелки в градусах
        relation_width: 0.3, // Желаемая ширина стикера относительно экрана
        translation_x: 0, // Сдвиг стикера по оси X от начального положения в плоскости XY
        translation_y: 0, // Сдвиг стикера по оси Y от начального положения в плоскости XY
        gravity: "center" // Расположение стикера
      },

      clickable_zones: [
        // Массив областей в стикере, нажатие на которые может вызвать какое-либо действие
        {
          action_type: "link", // Тип области (в данном случае, ссылка)
          action: {
            link: "https://vk.com/wall-166562603_1192", // Ссылка, которая будет открыта при нажатии
            tooltip_text_key: "tooltip_open_post"
          },
          clickable_area: [
            // Массив координат области
            { x: 17, y: 110 },
            { x: 97, y: 110 },
            { x: 97, y: 132 },
            { x: 17, y: 132 }
          ]
        }
        // Добавьте другие области, если необходимо
      ],

      can_delete: true // Информация о том, может ли пользователь удалить стикер из истории
    };

    const nativeStickerText = {
      can_delete: false,
      action_type: "text",
      action: {
        text: `Мои баллы: ${ServerUser.points || 0}`,
        //style: "cursive",
        selection_color: "#ffffff",
        //fontWeight: "bold",
      },

      transform: {
        rotation: 0, // Поворот текста
        relation_width: 0.5, // Желаемая ширина текста относительно экрана
        translation_x: 0, // Сдвиг текста по оси X от начального положения в плоскости XY
        translation_y: -0.01, // Сдвиг текста по оси Y от начального положения в плоскости XY
        gravity: "center", // Расположение текста
        fixed: true, // Зафиксировать положение стикера
      }
    };

    const storyParams = {
      background_type: "image",
      url: "https://raw.githubusercontent.com/Ssshaba/Foto-for-Story-VK/main/StoryPoints1.png",
      stickers: [
        // {
        //   sticker_type: "renderable",
        //   sticker: renderableStickerImage,
        // },
        {
          sticker_type: "native",
          sticker: nativeStickerText,
        },
      ],
    };

// Отправка события VKWebAppShowStoryBox с параметрами
    await bridge.send('VKWebAppShowStoryBox', storyParams);

  };

  // const handleGetFriendsClick = async () => {
  //   try {
  //     // const tokenData = await bridge.send('VKWebAppGetAuthToken', {
  //     //   app_id: 51766180,
  //     //   scope: 'friends,status',
  //     // });
  //
  //     const friendsData = await bridge.send('VKWebAppShare', {
  //       link: 'https://vk.com/app51766180',
  //     });
  //     console.log(tokenData);
  //     setFriends(friendsData.items);
  //     setIsSnackbarShown(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const achievementsItems = [
    {
      id: 1,
      title: 'Почувствовал вкус',
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
      <HorizontalCell key={id} size="l" style={{ whiteSpace: 'break-spaces', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image size={128} borderRadius="l" src={icon_139} />
          <div style={{ marginTop: '8px' }}>{title}</div>
        </div>
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
          style={{textAlign: 'center'}}>
            Мои баллы
        </PanelHeader>
        <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Div style={{ position: 'relative', width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={wrapperForScore}
              alt="Рамка для баллов"
              style={{ width: '90%', maxWidth: '90%' }}/>
            <Div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center' , justifyContent: 'center' }}>
              {user.photo_100 && (
              <>
              <div style={{ marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={user.photo_100}
                  size={100}
                  style={{
                    border: '3px solid #3CB6A2',
                    marginBottom: '40px',
                  }}
                />
                <div style={{marginLeft: '10px', marginTop: '-40px', display: 'flex', alignItems: 'center'}}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'auto',
                    height: '30px',
                    background: 'linear-gradient(to right, #4DDA65, #298FE1)',
                    borderRadius: '9px',
                    padding: '1px 15px',
                  }}>
                    <Icon16DonateOultine style={{ color: 'white' }} />
                    <Text weight="2" style={{ color: 'white', fontSize: '17px', paddingLeft: '5px' }}>{ServerUser.points || 0}</Text>
                  </div>
                  <IconButton onClick={showStory}>
                    <Icon28StoryOutline  style={{ color: '#298FE1' }} />
                  </IconButton>
                </div>
              </div>
              </>
              )}
              <img src={gift} 
                alt="Gift"
                style={{ width: '172px', height: '160px', marginLeft: '-25px'}} />
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
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>70</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div>Брелок "Лапка"</Div>

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
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>150</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div> <Text>Ежедневник</Text> </Div>
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
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>500</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div> <Text>Термокружка</Text> </Div>
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
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>640</Text>
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
                <Text style={{ marginRight: '8px', color: '#2787F5' }}>1000</Text>
                <Icon28DonateOutline style={{ color: '#4CD964' }} />
              </Div>
            }
          >
            <Div>Наушники</Div>
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
