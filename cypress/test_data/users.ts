type Users = 'userWithAccess' | 'userWithoutAccess';

export interface UserData {
  username: string;
  password: string;
}

const users: Record<DataENV, Record<Users, UserData>> = {
  dev: {
    userWithAccess: {
      username: 'me',
      password: '***REMOVED***',
    },
    userWithoutAccess: {
      username: 'you',
      password: '***REMOVED***',
    },
  }
};

export default users;
