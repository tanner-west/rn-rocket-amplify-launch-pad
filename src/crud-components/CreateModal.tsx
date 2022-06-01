import React, {useState} from 'react';
import {SafeAreaView, View, Modal} from 'react-native';
import {Button, Text, Card, Spinner} from '@ui-kitten/components';
import Field from '../ui/Field';
import createPost from '../api/create';
import {showToast} from '../util/toast';

const CreateModal = ({
  onHide,
  visible,
}: {
  onHide: () => void;
  visible: boolean;
}) => {
  const [formValues, setFormValues] = useState<{
    title?: string;
    content?: string;
  }>({});

  const [error, setError] = useState<null | string>(null);
  const [showLoading, setShowLoading] = useState(false);

  const onFieldChange = (name: string, value: string) => {
    setFormValues({...formValues, [name]: value});
  };

  const onSubmit = async () => {
    try {
      setShowLoading(true);
      const success = await createPost(formValues);
      showToast('success', 'Success!', 'Your new post was created!');
      onHide();
      setShowLoading(false);
    } catch (e: any) {
      setShowLoading(false);

      setError(e.message);
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
        {showLoading ? (
          <Spinner />
        ) : (
          <View style={{padding: 10}}>
            <Text category={'h1'} style={{marginBottom: 15}}>
              Create.
            </Text>
            {error ? (
              <Card status="danger" style={{marginBottom: 15}}>
                <Text>{error}</Text>
              </Card>
            ) : null}
            <Field name="title" onChange={onFieldChange} />
            <Field name="content" onChange={onFieldChange} />

            <Button onPress={onSubmit} style={{marginBottom: 15}}>
              Create
            </Button>
            <Button
              onPress={onHide}
              appearance="outline"
              style={{marginBottom: 15}}>
              Never mind!
            </Button>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default CreateModal;
