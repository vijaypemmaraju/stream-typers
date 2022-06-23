import React, { FC } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import useStore from './useStore';

const Users: FC = () => {
  const users = useStore(store => store.users);
  const userPoints = useStore(store => store.userPoints);
  const userColors = useStore(store => store.userColors);
  const userIcons = useStore(store => store.userIcons);
  const setUsers = useStore(store => store.setUsers);

  return (
    <Reorder.Group
      axis="y"
      values={users}
      onReorder={setUsers}
      className="pl-0 list-none"
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
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${((userPoints[item] || 0) / 1000) * 100}%`,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                {(userPoints[item] || 0) > 350 && (
                  <h2 className="flex items-center px-3 m-0 text-lg text-black">
                    <img
                      src={userIcons[item]}
                      alt={item}
                      className="w-12 h-12 mt-0 mb-0 mr-4"
                    />
                    {item}
                  </h2>
                )}
              </motion.div>
              {(userPoints[item] || 0) <= 350 && (
                <h2 className="flex items-center px-3 m-0 text-lg text-white">
                  <img
                    src={userIcons[item]}
                    alt={item}
                    className="w-12 h-12 mt-0 mb-0 mr-4"
                  />
                  {item}
                </h2>
              )}
            </div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default Users;
