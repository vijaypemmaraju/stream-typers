import React, { FC } from 'react';
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
        <h1
          style={{
            fontSize: 84,
            fontWeight: 'lighter',
            margin: 4,
            overflow: 'hidden',
            borderRight: '.1em solid orange',
            whiteSpace: 'nowrap',
            letterSpacing: '.15em',
            animation: `typing 2.5s steps(13, end), blink-caret .75s step-end infinite`,
          }}
        >
          Stream Typers
        </h1>
      </div>
      <div className="p-5">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Twitch Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            onChange={e => {
              setStreamer(e.target.value);
              setUsers([]);
            }}
          />
        </div>
      </div>
      {streamer && (
        <>
          <h3>Type !join in chat</h3>
          <div className="divider" />
          <div className="stats bg-gray-900">
            <div className="stat">
              <div className="stat-title">Connected Players</div>
              <div className="stat-value">{users.length} / 20</div>
            </div>
          </div>
          <Reorder.Group
            axis="y"
            values={users}
            onReorder={setUsers}
            className="list-none pl-0"
          >
            <AnimatePresence>
              {users.map(item => (
                <Reorder.Item dragListener={false} key={item} value={item}>
                  <div className="flex align-center justify-start items-center p-3">
                    <motion.div
                      className="flex align-center justify-center items-center w-[50vw] h-full p-3"
                      style={{
                        backgroundColor: userColors[item],
                      }}
                    >
                      <h6 className="text-black">{item}</h6>
                    </motion.div>
                  </div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
          <div className="p-5">
            <button
              type="button"
              className="btn"
              disabled={users.length === 0}
              onClick={() => {
                setMode('game');
                document.body.scrollTop = 0;
              }}
            >
              Start
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Lobby;
