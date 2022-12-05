import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { find } from 'lodash';

//dummy
const users = {
  userId: {
    userName: '',
    skills: [{ id: 1, skill: 'React', level: 10 }],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: {
      'user-1': {
        userName: 'Phuong',
        skills: [
          { id: 1, skill: 'ReactJS', level: 5 },
          { id: 2, skill: 'NodeJS', level: 5 },
          { id: 3, skill: 'AngularJS', level: 5 },
        ],
      },
      'user-2': {
        userName: 'Trung',
        skills: [
          { id: 1, skill: 'ReactJS', level: 50 },
          { id: 2, skill: 'NodeJS', level: 20 },
          { id: 3, skill: 'AngularJS', level: 30 },
        ],
      },
    },
  },
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [v4()]: {
            ...newUser,
          },
        },
      };
    },
    addSkill: (state, action) => {
      const { userId, newSkill } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            skills: [...state.users[userId].skills, newSkill],
          },
        },
      };
    },
    removeSkill: (state, action) => {
      const { newSkillList, userId } = action.payload;

      return {
        ...state,
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            skills: newSkillList,
          },
        },
      };
    },
  },
});

export const { addUser, addSkill, removeSkill } = userSlice.actions;

export default userSlice.reducer;
