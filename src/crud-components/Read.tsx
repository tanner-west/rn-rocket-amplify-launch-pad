import React from 'react';
import {View} from 'react-native';
import {Text, Card, Icon} from '@ui-kitten/components';

const Read = ({
  userIsAuthenticated,
  posts,
  onDeletePost,
}: {
  userIsAuthenticated?: boolean;
  posts?: any[];
  onDeletePost: (id: string, version: number) => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View>
        {posts &&
          posts.map(item => (
            <Card key={item.id} style={{marginBottom: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View>
                  <Text category={'h3'} style={{marginBottom: 10}}>
                    {item.title}
                  </Text>
                  <Text>{item.content}</Text>
                </View>
                <View>
                  <View>
                    {userIsAuthenticated ? (
                      <Icon
                        onPress={() => onDeletePost(item.id, item._version)}
                        style={{height: 25, width: 25}}
                        fill="#FF8888"
                        name="trash-2-outline"
                      />
                    ) : null}
                  </View>
                </View>
              </View>
            </Card>
          ))}
      </View>
    </View>
  );
};

export default Read;
