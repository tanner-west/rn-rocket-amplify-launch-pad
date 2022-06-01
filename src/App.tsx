import React, {useEffect, useState} from 'react';
import awsConfig from './aws-exports';
import * as eva from '@eva-design/eva';
import {SafeAreaView, ScrollView, View, TouchableOpacity} from 'react-native';
import {Amplify, Auth, API, Hub} from 'aws-amplify';
import {
  ApplicationProvider,
  Text,
  Button,
  IconRegistry,
  Icon,
  useTheme,
  Card,
  Spinner,
} from '@ui-kitten/components';
import SignInModal from './auth-components/SignInModal';
import SignUpModal from './auth-components/SignUpModal';
import ConfirmSignupModal from './auth-components/ConfirmSignupModal';
import Create from './crud-components/CreateModal';
import Read from './crud-components/Read';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
// import * as queries from './graphql/queries';
import {HubCapsule} from '@aws-amplify/core';
import Toast from 'react-native-toast-message';
import ProfileModal from './auth-components/ProfileModal';
import {showToast} from './util/toast';
import deletePost from './api/delete';

export enum AuthStates {
  SIGNED_OUT,
  SIGNED_IN,
}

export enum Modals {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CONFIRM_SIGN_UP,
  CREATE,
  PROFILE,
}

Amplify.configure({...awsConfig});

const Main = () => {
  const [visibleModal, setVisibleModal] = useState<Modals | undefined | null>();
  const [showLoading, setShowLoading] = useState(false);
  const [authState, setAuthState] = useState<AuthStates | undefined>();
  const [latestAuthEvent, setLatestAuthEvent] = useState<string | undefined>();
  const [posts, setPosts] = useState();
  const [error, setError] = useState<string | null>('');
  const [currentUser, setCurrentUser] = useState<any>();

  const theme = useTheme();

  const getPosts = async () => {
    try {
      setError(null);
      setShowLoading(true);
      // TODO: Implement listPosts endpoint
      // const postData = (await API.graphql({
      //   query: queries.listPosts,
      //   authMode: GRAPHQL_AUTH_MODE.API_KEY,
      // })) as any;
      // setPosts(
      //   postData.data.listPosts.items.sort((a: any, b: any) =>
      //     a.createdAt > b.createdAt ? -1 : 1,
      //   ),
      // );
      setShowLoading(false);
    } catch (e: any) {
      setShowLoading(false);
      setError(e.message);
    }
  };

  const onDeletePost = async (id: string, _version: number) => {
    try {
      setError(null);
      setShowLoading(true);
      await deletePost(id, _version);
      showToast('success', 'Success!', 'Your post was deleted.');
      getPosts();
      setShowLoading(false);
    } catch (e: any) {
      setShowLoading(false);
      setError(e.message);
    }
  };

  useEffect(() => {
    const authListener = ({payload}: HubCapsule) => {
      setLatestAuthEvent(payload.event);
    };
    getPosts();
    Hub.listen('auth', event => authListener(event));
    return Hub.remove('auth', authListener);
  }, []);

  useEffect(() => {
    if (authState === AuthStates.SIGNED_OUT) {
      setVisibleModal(Modals.SIGN_IN);
    }
  }, [authState]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        setCurrentUser(user);
        setAuthState(AuthStates.SIGNED_IN);
      } catch (e) {
        setCurrentUser(null);
        setAuthState(AuthStates.SIGNED_OUT);
      }
    };
    getUser();
  }, [latestAuthEvent]);

  useEffect(() => {
    setError(null);
  }, [visibleModal]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <ScrollView style={{flex: 1, padding: 10}}>
        {!!error ? (
          <Card status="danger" style={{marginBottom: 15}}>
            <Text>{error}</Text>
          </Card>
        ) : null}

        {authState === AuthStates.SIGNED_OUT ? (
          <View>
            <Text category="h1" style={{marginBottom: 15}}>
              Free Content
            </Text>
          </View>
        ) : null}

        {authState === AuthStates.SIGNED_IN ? (
          <>
            <Text category="h1" style={{marginBottom: 15}}>
              Premium Content
            </Text>
          </>
        ) : null}

        {showLoading ? (
          <Spinner />
        ) : (
          <Read
            posts={posts}
            userIsAuthenticated={authState === AuthStates.SIGNED_IN}
            onDeletePost={onDeletePost}
          />
        )}
      </ScrollView>

      <View
        style={{
          borderColor: 'gray',
          borderTopWidth: 1,
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{height: 40, width: 40}}></View>
        <TouchableOpacity onPress={() => setVisibleModal(Modals.CREATE)}>
          <Icon
            name="plus-circle-outline"
            fill={theme['color-primary-default']}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisibleModal(Modals.PROFILE)}>
          <Icon
            name="person-outline"
            fill={theme['color-primary-default']}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
      <SignInModal
        visible={visibleModal === Modals.SIGN_IN}
        onHide={() => setVisibleModal(null)}
        onShowSignUp={() => setVisibleModal(Modals.SIGN_UP)}
      />
      <SignUpModal
        visible={visibleModal === Modals.SIGN_UP}
        onHide={() => setVisibleModal(null)}
        onShowSignIn={() => setVisibleModal(Modals.SIGN_IN)}
        onShowConfirmSignup={() => setVisibleModal(Modals.CONFIRM_SIGN_UP)}
      />
      <ConfirmSignupModal
        visible={visibleModal === Modals.CONFIRM_SIGN_UP}
        onHide={() => setVisibleModal(null)}
        onShowSignIn={() => setVisibleModal(Modals.SIGN_IN)}
      />
      <ProfileModal
        visible={visibleModal === Modals.PROFILE}
        onHide={() => setVisibleModal(null)}
        onShowSignIn={() => setVisibleModal(Modals.SIGN_IN)}
        currentUser={currentUser}
      />
      <Create
        visible={visibleModal === Modals.CREATE}
        onHide={() => {
          setVisibleModal(null);
          getPosts();
        }}
      />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Main />
      </ApplicationProvider>
      <Toast />
    </SafeAreaView>
  );
};

export default App;
