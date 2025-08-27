type Users = 'userWithAccess' | 'userWithoutAccess';

export interface UserData {
  username: string;
  password: string;
}

const users: Record<DataENV, Record<Users, UserData>> = {
  dev: {
    userWithAccess: {
      username: 'me',
      password: 'SmipMe123456',
    },
    userWithoutAccess: {
      username: 'you',
      password: 'SmipMe123456',
    },
  }
};

export default users;
