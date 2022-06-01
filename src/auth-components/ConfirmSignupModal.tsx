import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {SafeAreaView, View, Modal} from 'react-native';
import {Input, Button, Card, Text} from '@ui-kitten/components';

const ConfirmSignupModal = ({
  onHide,
  onShowSignIn,
  visible,
}: {
  onHide: () => void;
  onShowSignIn: () => void;
  visible: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<null | string>(null);

  const authConfirmSignup = async () => {
    try {
      const {user} = await Auth.confirmSignUp(email, code);
      onShowSignIn();
    } catch (e) {
      setError('Incorrect username or password');
    }
  };

  const onChangeEmail = (text: string) => {
    setError(null);
    setEmail(text);
  };

  const onChangeCode = (text: string) => {
    setError(null);
    setCode(text);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={{padding: 10}}>
          <Text category={'h1'} style={{marginBottom: 15}}>
            Enter your confirmation code.
          </Text>
          {error ? (
            <Card status="danger" style={{marginBottom: 15}}>
              <Text>{error}</Text>
            </Card>
          ) : null}

          <Input
            label="Email"
            placeholder="Email"
            onChangeText={onChangeEmail}
            autoCapitalize={'none'}
            style={{marginBottom: 15}}
          />
          <Input
            label="Code"
            placeholder="Code"
            onChangeText={onChangeCode}
            secureTextEntry
            autoCapitalize={'none'}
            style={{marginBottom: 15}}
          />
          <Button onPress={authConfirmSignup} style={{marginBottom: 15}}>
            Confirm
          </Button>
          <Button
            onPress={onShowSignIn}
            appearance="outline"
            style={{marginBottom: 15}}>
            No account? Sign up!
          </Button>
        </View>
        <View style={{padding: 10}}>
          <Button onPress={onHide} appearance="ghost">
            Skip for now
          </Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ConfirmSignupModal;
