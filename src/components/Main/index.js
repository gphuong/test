import {
  Box,
  Button,
  IconButton,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Select,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  get as _get,
  map as _map,
  find as _find,
  findKey as _findKey,
} from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { addSkill, addUser, removeSkill } from '../../features/user/userSlice';
import { v4 } from 'uuid';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function Main() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputUserName, setInputUserName] = useState('');
  const [userSkill, setUserSkill] = useState('');
  const [level, setLevel] = useState(10);
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const handleChangeLevel = (e) => {
    setLevel(e.target.value);
  };

  const { userName = '' } = useParams();

  const listUser = useSelector((state) => {
    return _get(state, 'userList.users', {});
  });

  const currentUser =
    _find(
      listUser,
      (user) => user.userName?.toLowerCase() === userName?.toLowerCase()
    ) || {};

  console.log({ userName, currentUser });

  const currentUserSkills = _get(currentUser, 'skills', []);
  const userId = _findKey(listUser, currentUser);

  console.log({ currentUser, userId });

  const handleAddSkill = () => {
    const newSkill = {
      id: v4(),
      skill: userSkill,
      level,
    };

    dispatch(addSkill({ userId, newSkill }));
  };

  const handleDeleteSkill = (skillId) => {
    const findedUser =
      _find(
        listUser,
        (user) => user?.userName?.toLowerCase() === userName.toLowerCase()
      ) || {};
    const { skills = [] } = findedUser;

    const filteredSkill = skills.filter((skill) => skill.id !== skillId);

    dispatch(removeSkill({ newSkillList: filteredSkill, userId }));
  };

  const handleSelectUser = (props) => {
    const { innerText: userName = '' } = props.target;
    history.push(`/users/${userName?.toLowerCase()}`);
  };

  return (
    <div className='Main'>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.username}>
            <Input
              defaultValue='Trung TD'
              value={inputUserName}
              onChange={(e) => {
                const { value = '' } = e.target;
                setInputUserName(value);
              }}
              onKeyUp={(e) => {
                const { keyCode = '' } = e;
                if (keyCode === 13) {
                  dispatch(
                    addUser({
                      userName: inputUserName,
                      skills: [],
                    })
                  );
                  setInputUserName('');
                }
              }}
            />
          </div>
          <div className={styles.title}>
            <div className={styles.skill}>
              <span>Skill: </span>
              <Input
                defaultValue='React'
                value={userSkill}
                onChange={(e) => {
                  setUserSkill(e.target.value);
                }}
              />
            </div>
            <div className={styles.level}>
              <span>Level: </span>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={level}
                size='small'
                onChange={handleChangeLevel}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </div>
            <Button variant='outlined' onClick={handleAddSkill}>
              Add
            </Button>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.listUser}>
            <MenuList>
              {_map(listUser, (user, userId) => {
                return (
                  <MenuItem key={userId} onClick={handleSelectUser}>
                    <ListItemText>{user?.userName}</ListItemText>
                  </MenuItem>
                );
              })}
            </MenuList>
          </div>
          <div className={styles.listSkill}>
            <List dense={dense}>
              {_map(currentUserSkills, ({ id = '', skill = '', level = 0 }) => {
                return (
                  <ListItem
                    key={id}
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => {
                          handleDeleteSkill(id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      className={styles.skillName}
                      onClick={() => setUserSkill(skill)}
                      primary={skill}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <Box sx={{ width: '100%' }}>
                      <LinearProgressWithLabel value={level} />
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
