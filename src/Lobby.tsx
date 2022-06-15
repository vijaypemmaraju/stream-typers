import React, { FC } from 'react';
import { Button, Divider, List, TextField, Typography } from '@mui/material';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import useStore from './useStore';
import usePersistedStore from './usePersistedStore';

const Lobby: FC = () => {
  const users = useStore(store => store.users);
  const userColors = useStore(store => store.userColors);
  const setUsers = useStore(store => store.setUsers);
  const setMode = useStore(store => store.setMode);

  const streamer = usePersistedStore(store => store.streamer);
  const setStreamer = usePersistedStore(store => store.setStreamer);
  return (
    <>
      <div className="w-fit">
        <Typography
          variant="h1"
          sx={{
            margin: 4,
            overflow: 'hidden',
            borderRight: '.1em solid orange',
            whiteSpace: 'nowrap',
            letterSpacing: '.175em',
            animation: `typing 2.5s steps(14, end), blink-caret .75s step-end infinite`,
          }}
        >
          Stream Typers
        </Typography>
      </div>
      <div className="p-5">
        <TextField
          label="Twitch Username"
          value={streamer}
          onChange={e => {
            setStreamer(e.target.value);
            setUsers([]);
          }}
        />
      </div>
      {streamer && (
        <>
          <Typography variant="h5">Type !join in chat</Typography>
          <Divider sx={{ width: 500, margin: 5 }} />
          <Typography>Connected Players: {users.length} / 20</Typography>
          <Reorder.Group axis="y" values={users} onReorder={setUsers}>
            <List>
              <AnimatePresence>
                {users.map(item => (
                  <Reorder.Item dragListener={false} key={item} value={item}>
                    <Divider />
                    <div className="flex align-center justify-start items-center p-3">
                      <motion.div
                        className="flex align-center justify-center items-center w-[50vw] h-full p-3"
                        style={{
                          backgroundColor: userColors[item],
                        }}
                      >
                        <Typography variant="h6" style={{ color: 'black' }}>
                          {item}
                        </Typography>
                      </motion.div>
                    </div>
                    <Divider />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </List>
          </Reorder.Group>
          <div className="p-5">
            <Button
              variant="contained"
              size="large"
              disabled={users.length === 0}
              onClick={() => {
                setMode('game');
                document.body.scrollTop = 0;
              }}
            >
              Start
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Lobby;
