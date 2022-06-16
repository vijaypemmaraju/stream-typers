import React, { FC } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import useStore from './useStore';

const Users: FC = () => {
  const users = useStore(store => store.users);
  const userPoints = useStore(store => store.userPoints);
  const userColors = useStore(store => store.userColors);
  const setUsers = useStore(store => store.setUsers);

  return (
    <Reorder.Group
      axis="y"
      values={users}
      onReorder={setUsers}
      className="list-none pl-0"
    >
      <AnimatePresence>
        {users.map(item => (
          <Reorder.Item dragListener={false} key={item} value={item}>
            <div className="divider" />
            <div className="flex justify-start items-center h-[100px] p-3">
              <motion.div
                className="flex items-center justify-end h-full"
                style={{
                  backgroundColor: userColors[item],
                }}
                animate={{
                  width: ((userPoints[item] || 0) / 1000) * window.innerWidth,
                }}
              >
                {(userPoints[item] || 0) > 50 && (
                  <h2 className="m-0 pl-3 font-normal text-black">{item}</h2>
                )}
              </motion.div>
              {(userPoints[item] || 0) < 50 && (
                <h2 className="m-0 pl-3 font-normal text-white">{item}</h2>
              )}
            </div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default Users;
