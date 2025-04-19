import { createContext } from 'react';

interface ContextData {
  currentTag: Tag;
  tags: Tag[],
  userPermission?:any;
}

interface Tag {
  pathname: string,
  [propertys: string]: any
}

export type actionData = {
  currentTag?: Tag;
  tags?: Tag[];
};

// export const UserTypeResponse = {
//   'community':2,
//   'basic':20,
//   'professional':13,
//   'enterprise':6,
//   'enterpriseSubAccount':7,
// }


export const initState = {
  currentTag: {
    pathname: "/view/user/userList"
  },
  tags: [],
  userPermission:[],
}

export function reducer(state: ContextData, action: { type: string; data: ContextData }): ContextData {
  const { type, data } = action;
  switch (type) {
    case 'updateCurrentTag':
      return {
        ...state,
        currentTag: data.currentTag
      };
    case "updateTags":
      return {
        ...state,
        tags: data.tags
      }
    case "getPermission":
      return {
        ...state,
        userPermission: data.userPermission
      }
    default:
      return {
        ...state
      }
  }
}

export type Dispatch = (action: { type: string; data: ContextData }) => void;

export interface IContextProps {
  state: ContextData;
  dispatch: Dispatch;
}

// const Context = createContext({
//   state: initState,
//   dispatch: () => {}
// } as IContextProps);
const Context = createContext({} as IContextProps);


export default Context;
