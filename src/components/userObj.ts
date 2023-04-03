interface userObj {
  userObj:
    | {
        displayName: string | null;
        uid: string;
        photoURL: string | null;
      }
    | undefined;
}

export default userObj;
