import React, {useState} from 'react';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {SafeAreaView, View, Modal} from 'react-native';
import {Input, Button, Text, Card} from '@ui-kitten/components';
import * as mutations from '../graphql/mutations';

const Field = ({
  name,
  onChange,
}: {
  name: string;
  onChange: (name: string, value: string) => void;
}) => {
  return (
    <Input
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
      onChangeText={value => onChange(name, value)}
      style={{marginBottom: 15}}
    />
  );
};

export default Field;
