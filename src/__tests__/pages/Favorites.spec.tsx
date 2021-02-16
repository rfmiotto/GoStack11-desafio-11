import React from 'react';

import { render, wait } from '@testing-library/react-native';
import AxiosMock from 'axios-mock-adapter';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import api from '../../services/api';

import Favorites from '../../pages/Favorites';

const Stack = createStackNavigator();
const MockedNavigator = ({ component, params = {} }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MockedScreen"
          component={component}
          initialParams={params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const apiMock = new AxiosMock(api);

describe('Favorites', () => {
  it('should be able to list the favorite food plates', async () => {
    const items = [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: 19.9,
        category: 1,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
        extras: [
          {
            id: 1,
            name: 'Bacon',
            value: 1.5,
          },
          {
            id: 2,
            name: 'Frango',
            value: 2,
          },
        ],
      },
      {
        id: 2,
        name: 'Veggie',
        description:
          'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        price: '21.90',
        category: 2,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/veggie.png',
        extras: [
          {
            id: 3,
            name: 'Bacon',
            value: 1.5,
          },
        ],
      },
    ];

    apiMock.onGet('/favorites').reply(200, items);

    const { getByText } = render(<MockedNavigator component={Favorites} />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByText('Veggie')).toBeTruthy();
    expect(
      getByText(
        'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
      ),
    ).toBeTruthy();
  });
});
