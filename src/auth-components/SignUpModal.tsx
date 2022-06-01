import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {SafeAreaView, View, Modal} from 'react-native';
import {Input, Button, Text, Card} from '@ui-kitten/components';

const SignUpModal = ({
  onHide,
  onShowSignIn,
  onShowConfirmSignup,
  visible,
}: {
  onHide: () => void;
  onShowSignIn: () => void;
  onShowConfirmSignup: () => void;
  visible: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState<null | string>(null);

  const authSignUp = async () => {
    try {
      const {user} = await Auth.signUp({
        username: email,
        password,
        attributes: {email},
      });
      onShowConfirmSignup();
    } catch (e: any) {
      setSignupError(e.message);
    }
  };

  const onChangeEmail = (text: string) => {
    setSignupError(null);
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setSignupError(null);
    setPassword(text);
  };

  const onValidateSubmit = () => {
    if (password !== confirmPassword) {
      setSignupError("Passwords don't match");
      return;
    } else {
      authSignUp();
    }
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
            Create an account to get started.
          </Text>
          {signupError ? (
            <Card status="danger" style={{marginBottom: 15}}>
              <Text>{signupError}</Text>
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
          <Input
            label="Confirm Password"
            placeholder="Confirm password"
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize={'none'}
            style={{marginBottom: 15}}
          />
          <Button onPress={onValidateSubmit} style={{marginBottom: 15}}>
            Sign up
          </Button>
          <Button
            onPress={onShowSignIn}
            appearance="outline"
            style={{marginBottom: 15}}>
            Already have an account? Sign in!
          </Button>
          <View>
            <Button onPress={onShowConfirmSignup} appearance="ghost">
              Got a confirmation code? Enter it now.
            </Button>
          </View>
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

export default SignUpModal;
