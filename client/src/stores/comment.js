import React, { useReducer, useContext, createContext } from "react";
import myAxios from "../utils/myAxios";
import fetchTargetData from "../utils/fetchData";

const initialState = {
  comments: [],
  content: "",
};

const commentReducer = (state, action) => {
  switch (action.type) {
    case "READ_LOADING":
      return {
        ...state,
        loading: false,
        error: null,
      };

    case "READ_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: action.data.comments,
        error: null,
      };

    case "READ_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "EDIT_COMMENT":
      try {
        const editComment = async () => {
          await myAxios.put(
            `/issues/${action.data.issueId}/comment/${action.data.commentId}`,
            {
              content: action.data.content,
            }
          );
        };
        editComment();
        return state;
      } catch (error) {
        console.log(error);
      }

    case "ON_CHANGE_INPUTS":
      return {
        ...state,
        [action.name]: action.value,
      };

    case "CREATE_NEW_COMMENT":
      try {
        const createComment = async () => {
          const {
            data: { message },
          } = await myAxios.post(`/issues/${action.data.issueId}/comment`, {
            content: action.data.content,
          });
          if (message === "success") {
          }
        };
        createComment();
        return state;
      } catch (error) {
        console.log(error);
      }

    default:
      return state;
  }
};

const CommentStateContext = createContext();
const CommentDispatchContext = createContext();

const useCommentState = () => useContext(CommentStateContext);
const useCommentDispatch = () => useContext(CommentDispatchContext);

const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);
  return (
    <CommentStateContext.Provider value={state}>
      <CommentDispatchContext.Provider value={dispatch}>
        {children}
      </CommentDispatchContext.Provider>
    </CommentStateContext.Provider>
  );
};

export { CommentProvider, useCommentState, useCommentDispatch };
