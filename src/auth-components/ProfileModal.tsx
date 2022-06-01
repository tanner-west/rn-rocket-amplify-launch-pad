import React from 'react';
import {SafeAreaView, View, Modal} from 'react-native';
import {Auth} from 'aws-amplify';
import {Button, Text} from '@ui-kitten/components';

const ProfileModal = ({
  onHide,
  onShowSignIn,
  visible,
  currentUser,
}: {
  onHide: () => void;
  onShowSignIn: () => void;
  visible: boolean;
  currentUser: any;
}) => {
  const userEmail = currentUser?.attributes?.email;
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
            Profile
          </Text>
          {userEmail ? (
            <>
              <Text category={'p1'} style={{marginBottom: 15}}>
                Logged in as: <Text category={'s1'}>{userEmail}</Text>
              </Text>
              <Button onPress={() => Auth.signOut().then(out => onHide())}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Text category={'p1'} style={{marginBottom: 15}}>
                Hello, please sign in!
              </Text>
              <Button onPress={onShowSignIn}>Sign in</Button>
            </>
          )}
          <Button
            onPress={onHide}
            appearance={'ghost'}
            style={{marginBottom: 15}}>
            Done
          </Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ProfileModal;
