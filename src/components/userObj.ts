interface userObj {
  userObj:
    | {
        displayName: string | null;
        uid: string;
        photoURL: string | null;
      }
    | undefined;
}
interface refreshUser extends userObj {
  refreshUser: () => void;
}

export default userObj;
export type { refreshUser };
