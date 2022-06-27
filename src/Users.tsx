import React, { FC } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import useStore from './useStore';

type UserProps = {
  user: string;
};

const User: FC<UserProps> = ({ user }) => {
  const userPoints = useStore(store => store.userPoints);
  const userColors = useStore(store => store.userColors);
  const userIcons = useStore(store => store.userIcons);

  return (
    <Reorder.Item dragListener={false} value={user}>
      <div className="divider" />
      <div className="flex justify-start items-center h-[100px] p-3">
        <motion.div
          className="flex items-center justify-end h-full"
          style={{
            backgroundColor: userColors[user],
          }}
          initial={{
            width: 0,
          }}
          animate={{
            width: `${((userPoints[user] || 0) / 1000) * 100}%`,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {(userPoints[user] || 0) > 500 && (
            <h2 className="flex items-center px-3 m-0 text-lg text-black">
              <img
                src={userIcons[user]}
                alt={user}
                className="w-12 h-12 mt-0 mb-0 mr-4"
              />
              {user}
            </h2>
          )}
        </motion.div>
        {(userPoints[user] || 0) <= 500 && (
          <h2 className="flex items-center px-3 m-0 text-lg text-white">
            <img
              src={userIcons[user]}
              alt={user}
              className="w-12 h-12 mt-0 mb-0 mr-4"
            />
            {user}
          </h2>
        )}
      </div>
    </Reorder.Item>
  );
};

const Users: FC = () => {
  const users = useStore(store => store.users);
  const setUsers = useStore(store => store.setUsers);
  const winners = useStore(store => store.winners);

  return (
    <Reorder.Group
      axis="y"
      values={users}
      onReorder={setUsers}
      className="pl-0 list-none"
    >
      <AnimatePresence>
        {winners.map(user => (
          <User key={user} user={user} />
        ))}
        {users
          .filter(user => !winners.includes(user))
          .map(user => (
            <User key={user} user={user} />
          ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default Users;
