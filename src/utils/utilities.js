import React from 'react';
import bridge from '@vkontakte/vk-bridge';

export const closePage = async () => {
    try {
        await bridge.send('VKWebAppClose', { status: 'success' });
    } catch (error) {
        console.error(error);
    }
};

