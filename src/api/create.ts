import {API, graphqlOperation} from 'aws-amplify';
// import * as mutations from '../graphql/mutations';

const createPost = async (data: any) => {
  try {
    // TODO: Implement create endpoint
    // const post = {
    //   title: data.title,
    //   content: data.content,
    // };
    // const success = await API.graphql(
    //   graphqlOperation(mutations.createPost, {input: post}),
    // );
    // return success
  } catch (e: any) {
    throw new Error('Unable to create post.');
  }
};

export default createPost;