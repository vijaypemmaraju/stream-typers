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
      <div
        style={{
          width: 'fit-content',
        }}
      >
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
      <div style={{ padding: 20 }}>
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
                    <div
                      style={{
                        padding: 10,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <motion.div
                        style={{
                          width: '50vw',
                          backgroundColor: userColors[item],
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{ padding: 10, color: 'black' }}
                        >
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
          <div style={{ padding: 20 }}>
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
