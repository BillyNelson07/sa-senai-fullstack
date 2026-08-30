import { useState } from 'react';
import styles from './Home.module.css';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import Pagination from '../../components/Pagination/Pagination';
import { filterOptions, feedActivities } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { isLoggedIn, openLoginModal } = useAuth();
  const [activeFilter, setActiveFilter] = useState(filterOptions[0]);
  const [page, setPage] = useState(1);
  const [likedMap, setLikedMap] = useState(
    Object.fromEntries(feedActivities.map((a) => [a.id, a.liked]))
  );
  const [openCommentId, setOpenCommentId] = useState(null);

  // Regra 8: qualquer interação sem estar logado deve abrir o modal de login.
  const guard = (fn) => (...args) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    fn(...args);
  };

  const toggleLike = guard((id) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  });

  const toggleComments = guard((id) => {
    setOpenCommentId((prev) => (prev === id ? null : id));
  });

  return (
    <>
      <FilterTabs options={filterOptions} active={activeFilter} onChange={guard(setActiveFilter)} />

      <div className={styles.view}>
        <div className={styles.feed}>
          {feedActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              liked={!!likedMap[activity.id]}
              onToggleLike={() => toggleLike(activity.id)}
              commentsOpen={openCommentId === activity.id}
              onToggleComments={() => toggleComments(activity.id)}
            />
          ))}
        </div>

        <Pagination page={page} totalPages={3} onChange={guard(setPage)} />
      </div>
    </>
  );
}
