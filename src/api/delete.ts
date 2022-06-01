import {API, graphqlOperation} from 'aws-amplify';
// import * as mutations from '../graphql/mutations';

const deletePost = async (id: string, _version: number) => {
  try {
    // TODO implement delete endpoint
    // const postData = await API.graphql(
    //   graphqlOperation(mutations.deletePost, {input: {id, _version}}),
    // );
    // return postData;
  } catch (e) {
    throw new Error('Unable to delete post.');
  }
};

export default deletePost;
