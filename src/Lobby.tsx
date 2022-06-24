import { ApiClient, HelixPrivilegedUser } from '@twurple/api';
import React, { FC, useEffect } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { parse } from 'query-string';
import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import useStore from './useStore';
import usePersistedStore from './usePersistedStore';
import Settings from './Settings';
import Stats from './Stats';

const Lobby: FC = () => {
  const users = useStore(store => store.users);
  const userColors = useStore(store => store.userColors);
  const userIcons = useStore(store => store.userIcons);
  const setUsers = useStore(store => store.setUsers);
  const setIconForUser = useStore(store => store.setIconForUser);
  const setMode = useStore(store => store.setMode);

  const streamer = usePersistedStore(store => store.streamer);
  const setStreamer = usePersistedStore(store => store.setStreamer);
  const accessToken = usePersistedStore(store => store.accessToken);
  const setAccessToken = usePersistedStore(store => store.setAccessToken);
  const maxPlayers = usePersistedStore(store => store.maxPlayers);

  const [currentUser, setCurrentUser] =
    React.useState<HelixPrivilegedUser | null>(null);

  const addColorForUser = useStore(store => store.addColorForUser);

  const modalToggleRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loader = async () => {
      const chatClient = new ChatClient({
        channels: [streamer],
        logger: {
          custom: console.log,
          minLevel: 0,
        },
      });
      const authProvider = new StaticAuthProvider(
        'rybwfkon925lffxuhr5tlkyqs259q5',
        accessToken,
      );
      const apiClient = new ApiClient({ authProvider });
      Object.keys(usePersistedStore.getState().winners).forEach(
        async winner => {
          const user = await apiClient.users.getUserByName(winner);
          setIconForUser(winner, user!.profilePictureUrl);
        },
      );
      chatClient.connect().then(() => {
        chatClient.onMessage(
          async (_channel: string, _user: string, message: string, msg) => {
            if (modalToggleRef.current!.checked) {
              return;
            }
            // eslint-disable-next-line no-shadow
            const { mode, users } = useStore.getState();
            const userName = msg.userInfo.displayName.toLowerCase();
            const user = await apiClient.users.getUserById(msg.userInfo.userId);
            setIconForUser(userName, user!.profilePictureUrl);
            if (mode === 'lobby') {
              if (message.toLowerCase().trim() === '!join') {
                if (users.length >= usePersistedStore.getState().maxPlayers) {
                  return;
                }
                users.push(userName);
                addColorForUser(userName);
              }
              setUsers(Array.from(new Set(users)));
            }
          },
        );
      });
    };
    loader();
  }, [streamer]);

  const categoryFrequencySettings = usePersistedStore(
    store => store.categoryFrequencySettings,
  );

  const areAllCategoryFrequencyValuesZero = Object.values(
    categoryFrequencySettings,
  ).every(value => value === 0);

  useEffect(() => {
    (async () => {
      if (location.hash) {
        setAccessToken(parse(location.hash.slice(1)).access_token as string);
        location.hash = '';
      }
      if (accessToken) {
        const authProvider = new StaticAuthProvider(
          'rybwfkon925lffxuhr5tlkyqs259q5',
          accessToken,
        );
        const apiClient = new ApiClient({ authProvider });
        try {
          const user = await apiClient.users.getMe();
          setCurrentUser(user);
          setStreamer(user.displayName);
        } catch (e) {
          setAccessToken('');
        }
      }
    })();
  }, [accessToken]);

  return (
    <div className="flex gap-[200px]">
      <div className="flex flex-col items-center justify-center prose">
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
          <h4 className="text-center">
            by{' '}
            <a
              className="link"
              href="https://twitch.tv/elevatelol"
              target="_blank"
              rel="noreferrer"
            >
              @elevatelol
            </a>
          </h4>
        </div>
        <div className="p-5">
          <div className="w-full max-w-xs form-control">
            {currentUser && (
              <>
                <h3>Hello, {currentUser.displayName}</h3>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setAccessToken('');
                    setCurrentUser(null);
                  }}
                >
                  Sign Out
                </button>
              </>
            )}
            {!currentUser && (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=rybwfkon925lffxuhr5tlkyqs259q5&redirect_uri=${window.location.href.replace(
                    /\/$/,
                    '',
                  )}&scope=user:read:email`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mr-4"
                >
                  <path
                    d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="#fff"
                  />
                </svg>
                Login with Twitch
              </button>
            )}
          </div>
        </div>
        {streamer && (
          <>
            <button
              type="button"
              className="btn"
              onClick={() => {
                modalToggleRef.current!.checked = true;
              }}
            >
              Settings
            </button>
            <h3>Type !join in chat</h3>
            <div className="divider" />
            <div className="bg-gray-900 stats">
              <div className="stat">
                <div className="stat-title">Connected Players</div>
                <div className="stat-value">
                  {users.length} / {maxPlayers}
                </div>
              </div>
            </div>
            <Reorder.Group
              axis="y"
              values={users}
              onReorder={setUsers}
              className="pl-0 list-none"
            >
              <AnimatePresence>
                {users.map(item => (
                  <Reorder.Item dragListener={false} key={item} value={item}>
                    <div className="flex items-center justify-start p-3 align-center">
                      <motion.div
                        className="flex align-center justify-center items-center w-[25vw] rounded-xl h-full p-3"
                        layout
                        style={{
                          backgroundColor: userColors[item],
                        }}
                      >
                        <img
                          src={userIcons[item]}
                          alt={item}
                          className="w-12 h-12 mt-0 mb-0 mr-4"
                        />
                        <h6 className="text-2xl font-bold text-black">
                          {item}
                        </h6>
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
            <input
              type="checkbox"
              id="my-modal"
              className="modal-toggle"
              ref={modalToggleRef}
            />
            <div className="modal">
              <div className="modal-box max-w-[50vw]">
                <Settings />
                {areAllCategoryFrequencyValuesZero && (
                  <div className="p-5">
                    <h3>
                      You have not selected any categories. Please select at
                      least one category.
                    </h3>
                  </div>
                )}
                <button
                  type="button"
                  className="btn"
                  disabled={areAllCategoryFrequencyValuesZero}
                  onClick={() => {
                    modalToggleRef.current!.checked = false;
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Stats />
    </div>
  );
};

export default Lobby;
