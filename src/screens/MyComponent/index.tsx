// MyComponent.js
import React from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {useQuery, QueryClient} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import {increment, decrement} from '../../../Redux/counterSlice';

const fetchData = async (count: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${count}`,
  );
  return response.json();
};

const MyComponent = () => {
  const dispatch = useDispatch();
  const {count} = useSelector((state: any) => state.counter);
  const {data, isLoading, error} = useQuery(['postData', count], () =>
    fetchData(count),
  );

  return (
    <SafeAreaView>
      <Text>Counter: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error?.message}</Text>
      ) : (
        <Text>Data: {data.title}</Text>
      )}
    </SafeAreaView>
  );
};

export default MyComponent;
