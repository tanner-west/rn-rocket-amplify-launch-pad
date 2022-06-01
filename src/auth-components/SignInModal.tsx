import React, {useState} from 'react';
import {SafeAreaView, View, Modal} from 'react-native';
import {Auth} from 'aws-amplify';
import {Input, Button, Card, Text} from '@ui-kitten/components';

const SignInModal = ({
  onHide,
  onShowSignUp,
  visible,
}: {
  onHide: () => void;
  onShowSignUp: () => void;
  visible: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinError, setSigninError] = useState<null | string>(null);

  const authSignIn = async (email: string, password: string) => {
    try {
      await Auth.signIn({username: email, password});
      onHide();
    } catch (e) {
      setSigninError('Incorrect username or password');
    }
  };

  const onChangeEmail = (text: string) => {
    setSigninError(null);
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setSigninError(null);
    setPassword(text);
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
            Welcome! Please sign in.
          </Text>
          {signinError ? (
            <Card status="danger" style={{marginBottom: 15}}>
              <Text>{signinError}</Text>
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
            label="Password"
            placeholder="Password"
            onChangeText={onChangePassword}
            secureTextEntry
            autoCapitalize={'none'}
            style={{marginBottom: 15}}
          />
          <Button
            onPress={() => authSignIn(email, password)}
            style={{marginBottom: 15}}>
            Sign in
          </Button>
          <Button
            onPress={onShowSignUp}
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

export default SignInModal;
